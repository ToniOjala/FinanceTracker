use serde::{Serialize, Deserialize};
use rusqlite::{params, Connection, Error};

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct RecurringExpense {
  pub id: Option<i64>,
  #[serde(rename="categoryId")]
  pub category_id: i64,
  pub name: String,
  pub amount: f64,
  pub recurs: String,
  pub day: i8,
  pub month: i8,
  #[serde(rename="notifyDaysBefore")]
  pub notify_days_before: i8,
}

impl RecurringExpense {
  pub fn new(data: String) -> Result<RecurringExpense, serde_json::Error> {
    let expense: RecurringExpense = serde_json::from_str(&data)?;
    Ok(expense)
  }

  pub fn add_to_db(&mut self, db: &Connection) -> Result<(), Error> {
    db.execute("INSERT INTO recurringExpenses (categoryId, name, amount, recurs, day, month, notifyDaysBefore) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)",
      params![self.category_id, self.name, self.amount, self.recurs, self.day, self.month, self.notify_days_before])?;
    self.id = Some(db.last_insert_rowid());
    Ok(())
  }

  pub fn update_to_db(&self, db: &Connection) -> Result<(), Error> {
    db.execute("UPDATE recurringExpenses SET categoryId = ?1, name = ?2, amount = ?3, recurs = ?4, day = ?5, month = ?6, notifyDaysBefore = ?7 WHERE Id = ?8",
      params![self.category_id, self.name, self.amount, self.recurs, self.day, self.month, self.notify_days_before, self.id])?;
    Ok(())
  }

  pub fn get_all_from_db (db: &Connection) -> Result<Vec<RecurringExpense>, Error> {
    let mut stmt = db.prepare("SELECT * FROM recurringExpenses ORDER BY day")?;
    let mapped_rows = stmt.query_map([], |row| {
      Ok(RecurringExpense {
        id: row.get(0)?,
        category_id: row.get(1)?,
        name: row.get(2)?,
        amount: row.get(3)?,
        recurs: row.get(4)?,
        day: row.get(5)?,
        month: row.get(6)?,
        notify_days_before: row.get(7)?,
      })
    })?;

    let mut expenses: Vec<RecurringExpense> = Vec::new();
    for expense in mapped_rows {
      expenses.push(expense.unwrap());
    }
    Ok(expenses)
  }

  pub fn delete_from_db (&self, db: &Connection) -> Result<(), Error> {
    db.execute("DELETE FROM recurringExpenses WHERE id = ?", params![self.id])?;
    Ok(())
  }
}