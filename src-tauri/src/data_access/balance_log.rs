use serde::{Deserialize, Serialize};
use rusqlite::{Connection, Error, params};

use super::transaction::Transaction;

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct BalanceLog {
  pub id: Option<i64>,
  #[serde(rename="categoryId")]
  pub category_id: i64,
  pub transaction_id: i64,
  pub amount: f64,
  pub date: String,
  pub label: String
}

impl BalanceLog {
  pub fn new(category_id: i64, transaction_id: i64, amount: f64, date: String, label: String) -> BalanceLog {
    BalanceLog { id: None, category_id, transaction_id, amount, date, label }
  }

  pub fn from_transaction(transaction: &Transaction) -> BalanceLog {
    BalanceLog {
      id: None,
      category_id: transaction.category_id,
      transaction_id: transaction.id,
      amount: -transaction.amount,
      date: transaction.date.clone(),
      label: transaction.label.clone()
    }
  }

  pub fn add_to_db(&mut self, db: &Connection) -> Result<(), Error> {
    db.execute("INSERT INTO balanceLogs (categoryId, transactionId, amount, date, label) VALUES (?1, ?2, ?3, ?4, ?5)",
    params![self.category_id, self.transaction_id, self.amount, self.date, self.label])?;
    self.id = Some(db.last_insert_rowid());
    Ok(())
  }

  pub fn get_from_db_with_transaction(db: &Connection, transaction_id: i64) -> Result<BalanceLog, Error> {
    let mut stmt = db.prepare("SELECT * FROM balanceLogs WHERE transactionId = ?")?;
    let mut mapped_rows = stmt.query_map(params![transaction_id], |row| {
      Ok(BalanceLog {
        id: row.get(0)?,
        category_id: row.get(1)?,
        transaction_id: row.get(2)?,
        amount: row.get(3)?,
        date: row.get(4)?,
        label: row.get(5)?,
      })
    })?;

    let balance_log = mapped_rows.next().unwrap()?;
    Ok(balance_log)
  }

  pub fn get_count_from_db(db: &Connection, category_id: i64) -> Result<i64, Error> {
    let mut count: i64 = 0;
    let mut stmt = db.prepare("SELECT COUNT(*) FROM balanceLogs WHERE categoryId = ?")?;
    let mut rows = stmt.query(params![category_id])?;

    while let Some(row) = rows.next().unwrap() {
      count = row.get(0)?;
    }

    Ok(count)
  }

  pub fn get_from_db_by_category_and_page(db: &Connection, category_id: i64, page: i8) -> Result<Vec<BalanceLog>, Error> {
    let mut stmt = db.prepare("SELECT * FROM balanceLogs WHERE categoryId = ?1 ORDER BY date DESC LIMIT 10 OFFSET 10 * ?2")?;
    let mapped_rows = stmt.query_map(params![category_id, page], |row| {
      Ok(BalanceLog {
        id: row.get(0)?,
        category_id: row.get(1)?,
        transaction_id: row.get(2)?,
        amount: row.get(3)?,
        date: row.get(4)?,
        label: row.get(5)?,
      })
    })?;

    let mut balance_logs: Vec<BalanceLog> = Vec::new();
    for balance_log in mapped_rows {
      balance_logs.push(balance_log.unwrap());
    }
    Ok(balance_logs)
  }

  pub fn update_to_db(&self, db: &Connection) -> Result<(), Error> {
    db.execute("UPDATE balanceLogs SET amount = ?1, date = ?2, label = ?3 WHERE id = ?4",
      params![self.amount, self.date, self.label, self.id])?;
    Ok(())
  }

  pub fn delete_from_db(&self, db: &Connection) -> Result<(), Error> {
    db.execute("DELETE FROM balanceLogs WHERE Id = ?1", params![self.id])?;
    Ok(())
  }

  // fn get_all_from_db(db: &Connection) -> Result<Vec<BalanceLog, String>> {
  //   let mut stmt = db.prepare("SELECT * FROM balanceLogs")?;
  //   let blog_iter = stmt.query_map([], |row| {
  //     Ok(BalanceLog {
  //       id: row.get(0)?,
  //       category_id: row.get(1)?,
  //       transaction_id: row.get(2)?,
  //       amount: row.get(3)?,
  //       date: row.get(4)?,
  //       label: row.get(5)?,
  //     })
  //   });

  //   let mut balance_logs = Vec::new();
  //   for blog in blog_iter {
  //     balance_logs.push(blog.unwrap());
  //   }

  //   Ok(balance_logs)
  // }
}