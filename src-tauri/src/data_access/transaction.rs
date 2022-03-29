use std::collections::HashMap;

use serde::{Deserialize, Serialize};
use rusqlite::{params, Connection, Error};

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Transaction {
  pub id: i64,
  #[serde(rename="categoryId")]
  pub category_id: i64,
  pub amount: f64,
  pub date: String,
  pub label: String,
}

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct NewTransaction {
  #[serde(rename="categoryId")]
  pub category_id: i64,
  pub amount: f64,
  pub date: String,
  pub label: String,
  pub ctype: String,
  pub balance_additions: Option<HashMap<i64, f64>>,
}

impl NewTransaction {
  pub fn new (data: String) -> Result<NewTransaction, serde_json::Error> {
    let transaction: NewTransaction = serde_json::from_str(&data)?;
    Ok(transaction)
  }

  pub fn add_to_db(&mut self, db:&Connection) -> Result<Transaction, Error> {
    db.execute("INSERT INTO transactions (categoryId, amount, date, label) VALUES (?1, ?2, ?3, ?4)",
    params![self.category_id, self.amount, self.date, self.label])?;
    let id = db.last_insert_rowid();
    Ok(Transaction::new(id, self.category_id, self.amount, self.date.clone(), self.label.clone()))
  }
}

impl Transaction {
  pub fn parse(data: String) -> Result<Transaction, serde_json::Error> {
    let transaction: Transaction = serde_json::from_str(&data)?;
    Ok(transaction)
  }

  pub fn new(id: i64, category_id: i64, amount: f64, date: String, label: String) -> Transaction {
    Transaction {id, category_id, amount, date, label }
  }

  pub fn update_to_db(&self, db: &Connection) -> Result<(), Error> {
    db.execute("UPDATE transactions SET amount = ?1, date = ?2, label = ?3 WHERE id = ?4",
      params![self.amount, self.date, self.label, self.id])?;
    Ok(())
  }

  pub fn delete_from_db(&self, db: &Connection) -> Result<(), Error> {
    db.execute("DELETE FROM transactions WHERE Id = ?1",
    params![self.id])?;
    Ok(())
  }

  pub fn get_from_db(db: &Connection, id: i64) -> Result<Transaction, Error> {
    let mut stmt = db.prepare("SELECT * FROM transactions WHERE id = ?")?;
    let mut mapped_rows = stmt.query_map(params![id], |row| {
      Ok(Transaction {
        id: row.get(0)?,
        amount: row.get(1)?,
        date: row.get(2)?,
        label: row.get(3)?,
        category_id: row.get(4)?,
      })
    })?;

    let transaction = mapped_rows.next().unwrap()?;
    Ok(transaction)
  }

  pub fn get_by_month_from_db(db: &Connection, year: i16, month: i8) -> Result<Vec<Transaction>, Error> {
    let mut date = format!("{}-0{}-01", year, month);
    if month >= 10 {
      date = format!("{}-{}-01", year, month);
    }

    let mut stmt = db.prepare("SELECT * FROM transactions WHERE date BETWEEN date(?1) AND date(?1, '+1 month', '-1 day') ORDER BY date")?;
    let mapped_rows = stmt.query_map(params![date], |row| {
      Ok(Transaction {
        id: row.get(0)?,
        amount: row.get(1)?,
        date: row.get(2)?,
        label: row.get(3)?,
        category_id: row.get(4)?,
      })
    })?;

    let mut transactions: Vec<Transaction> = Vec::new();
    for transaction in mapped_rows {
      match transaction {
        Ok(tr) => transactions.push(tr),
        Err(e) => panic!("query_map error: {}", e),
      }
    }
    Ok(transactions)
  }

  pub fn get_by_month_and_category(db: &Connection, year: i16, month: i8, category_id: i64) -> Result<Vec<Transaction>, Error> {
    let mut date = format!("{}-0{}-01", year, month);
    if month >= 10 {
      date = format!("{}-{}-01", year, month);
    }

    let mut stmt = db.prepare("SELECT * FROM transactions WHERE categoryId = ?1 AND date BETWEEN date(?2) AND date(?2, '+1 month', '-1 day')")?;
    let mapped_rows = stmt.query_map(params![category_id, date], |row| {
      Ok(Transaction {
        id: row.get(0)?,
        amount: row.get(1)?,
        date: row.get(2)?,
        label: row.get(3)?,
        category_id: row.get(4)?,
      })
    })?;

    let mut transactions: Vec<Transaction> = Vec::new();
    for transaction in mapped_rows {
      transactions.push(transaction.unwrap());
    }
    Ok(transactions)
  }
}