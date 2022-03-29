use serde::{Serialize, Deserialize};
use rusqlite::{params, Connection, Error};

#[derive(Serialize, Deserialize)]
pub struct Category {
  pub id: Option<i64>,
  pub name: String,
  pub ctype: String,
  pub balance: f64,
  pub created: String,
  pub removed: Option<String>,
}

impl Category {
  pub fn new(data: String) -> Result<Category, serde_json::Error> {
    let category: Category = serde_json::from_str(&data)?;
    Ok(category)
  }

  pub fn add_to_db(&mut self, db: &Connection) -> Result<(), Error> {
    db.execute("INSERT INTO categories (name, type, balance, created, removed) VALUES (?1, ?2, ?3, ?4, ?5)",
    params![self.name, self.ctype, self.balance, self.created, self.removed])?;
    self.id = Some(db.last_insert_rowid());
    Ok(())
  }

  pub fn update_to_db (&self, db: &Connection) -> Result<(), Error> {
    db.execute("UPDATE categories SET name = ?1, balance = ?2, removed = ?3 WHERE id = ?4",
      params![self.name, self.balance, self.removed, self.id])?;
    Ok(())
  }

  pub fn get_all_from_db (db: &Connection, year: i16) -> Result<Vec<Category>, Error> {
    let mut stmt = db.prepare("SELECT * FROM categories WHERE removed IS NULL OR removed = '' OR removed > ? ORDER BY type DESC")?;
    let mapped_rows = stmt.query_map([year], |row| {
      Ok(Category {
        id: row.get(0)?,
        name: row.get(1)?,
        ctype: row.get(2)?,
        balance: row.get(3)?,
        created: row.get(4)?,
        removed: row.get(5)?,
      })
    })?;

    let mut categories: Vec<Category> = Vec::new();
    for category in mapped_rows {
      categories.push(category.unwrap());
    }
    Ok(categories)
  }

  pub fn get_from_db (db: &Connection, id: i64) -> Result<Category, Error> {
    let mut stmt = db.prepare("SELECT * FROM categories WHERE id = ?")?;
    let mut mapped_rows = stmt.query_map(params![id], |row| {
      Ok(Category {
        id: row.get(0)?,
        name: row.get(1)?,
        ctype: row.get(2)?,
        balance: row.get(3)?,
        created: row.get(4)?,
        removed: row.get(5)?,
      })
    })?;

    let category = mapped_rows.next().unwrap()?;
    Ok(category)
  }

  pub fn delete_from_db (&self, db: &Connection) -> Result<(), Error> {
    db.execute("DELETE FROM categories WHERE id = ?", params![self.id])?;
    Ok(())
  }
}