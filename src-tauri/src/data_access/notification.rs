use serde::{Serialize, Deserialize};
use rusqlite::{params, Connection, Error};

#[derive(Serialize, Deserialize)]
pub struct Notification {
  pub id: Option<i64>,
  pub message: String,
  pub read: Option<bool>,
  pub date: String,
}

impl Notification {
  pub fn new(data: String) -> Result<Notification ,serde_json::Error> {
    let notification: Notification = serde_json::from_str(&data)?;
    Ok(notification)
  }

  pub fn add_to_db(&mut self, db: &Connection) -> Result<(), Error> {
    db.execute("INSERT INTO notifications (message, read, date) VALUES (?1, 0, ?3)",
      params![self.message, self.read, self.date])?;
    self.id = Some(db.last_insert_rowid());
    Ok(())
  }

  pub fn update_to_db (&self, db: &Connection) -> Result<(), Error> {
    db.execute("UPDATE notifications SET read = 1 WHERE id = ?", [self.id])?;
    Ok(())
  }

  pub fn get_all_from_db (db: &Connection) -> Result<Vec<Notification>, Error> {
    let mut stmt = db.prepare("SELECT * FROM notifications ORDER BY date DESC")?;
    let mapped_rows = stmt.query_map([], |row| {
      Ok(Notification {
        id: row.get(0)?,
        message: row.get(1)?,
        read: row.get(2)?,
        date: row.get(3)?,
      })
    })?;

    let mut notifications: Vec<Notification> = Vec::new();
    for notification in mapped_rows {
      notifications.push(notification.unwrap());
    }
    Ok(notifications)
  }

  pub fn delete_from_db (&self, db: &Connection) -> Result<(), Error> {
    db.execute("DELETE FROM notifications WHERE id = ?", params![self.id])?;
    Ok(())
  }
}