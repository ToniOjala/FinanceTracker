use serde::{Serialize, Deserialize};
use rusqlite::{params, Connection, Error};

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Budget {
  pub id: Option<i64>,
  #[serde(rename="categoryId")]
  pub category_id: i64,
  pub amount: f64,
  #[serde(rename="startDate")]
  pub start_date: String
}

impl Budget {
  pub fn new(data: String) -> Result<Budget, serde_json::error::Error> {
    let budget: Budget = serde_json::from_str(&data)?;
    Ok(budget)
  }

  pub fn add_to_db(&mut self, db: &Connection) -> Result<(), Error> {
    db.execute("INSERT INTO budgets (categoryId, amount, startDate) VALUES (?1, ?2, ?3)",
      params![self.category_id, self.amount, self.start_date])?;
    self.id = Some(db.last_insert_rowid());
    Ok(())
  }

  pub fn update_to_db(&self, db: &Connection) -> Result<(), Error> {
    db.execute("UPDATE budgets SET amount = ?1 WHERE id = ?2",
      params![self.amount, self.id])?;
    Ok(())
  }

  pub fn get_latest_per_category(db: &Connection, date: String) -> Result<Vec<Budget>, Error> {
    let mut stmt = db.prepare("SELECT * FROM budgets b1
      INNER JOIN (
        SELECT max(startDate) startDate, categoryId FROM budgets
        WHERE startDate <= date(?)
        GROUP BY categoryId
      ) b2 ON b1.categoryId = b2.categoryId
      AND b1.startDate = b2.startDate")?;
    let mapped_rows = stmt.query_map([date], |row| {
      Ok(Budget {
        id: row.get(0)?,
        amount: row.get(1)?,
        start_date: row.get(2)?,
        category_id: row.get(3)?,
      })
    })?;

    let mut budgets: Vec<Budget> = Vec::new();
    for budget in mapped_rows {
      budgets.push(budget.unwrap());
    }
    Ok(budgets)
  }

  pub fn get_by_category_and_date(db: &Connection, category_id: &i64, date: &String) -> Result<Budget, Error> {
    let mut stmt = db.prepare("SELECT * FROM budgets WHERE categoryId = ?1 AND startDate = ?2")?;
    let mut mapped_rows = stmt.query_map(params![category_id, date], |row| {
      Ok(Budget {
        id: row.get(0)?,
        amount: row.get(1)?,
        start_date: row.get(2)?,
        category_id: row.get(3)?
      })
    })?;

    match mapped_rows.next() {
      Some(row) => {
        let budget = row.unwrap();
        Ok(budget)
      },
      None => return Err(Error::QueryReturnedNoRows),
    }
  }
}