use serde::{Serialize, Deserialize};
use rusqlite::{params, Connection, Error};

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Label {
  pub id: Option<i64>,
  #[serde(rename="categoryId")]
  pub category_id: i64,
  pub name: String,
  #[serde(rename="lastUsed")]
  pub last_used: String,
}

impl Label {
  pub fn new (data: String) -> Result<Label, serde_json::Error> {
    let label: Label = serde_json::from_str(&data)?;
    Ok(label)
  }

  pub fn add_to_db (&mut self, db: &Connection) -> Result<(), Error> {
    db.execute("INSERT INTO labels (categoryId, name, lastUsed) VALUES (?1, ?2, ?3)",
      params![self.category_id, self.name, self.last_used])?;
    self.id = Some(db.last_insert_rowid());
    Ok(())
  }

  pub fn get_all_by_category (db: &Connection, category_id: i64) -> Result<Vec<Label>, Error> {
    let mut stmt = db.prepare("SELECT * FROM labels WHERE categoryId = ?")?;
    let mapped_rows = stmt.query_map(params![category_id], |row| {
      Ok(Label {
        id: row.get(0)?,
        category_id: row.get(1)?,
        name: row.get(2)?,
        last_used: row.get(3)?,
      })
    })?;

    let mut labels: Vec<Label> = Vec::new();
    for label in mapped_rows {
      labels.push(label.unwrap());
    }
    Ok(labels)
  }

  pub fn get_by_name (db: &Connection, name: String) -> Result<Label, Error> {
    let mut stmt = db.prepare("SELECT * FROM labels WHERE name = ?")?;
    let mut mapped_rows = stmt.query_map(params![name], |row| {
      Ok(Label { 
        id: row.get(0)?,
        category_id: row.get(1)?,
        name: row.get(2)?,
        last_used: row.get(3)?,
      })
    })?;

    match mapped_rows.next() {
      Some(row) => {
        let label = row.unwrap();
        Ok(label)
      },
      None => return Err(Error::QueryReturnedNoRows),
    }
  }

  pub fn update_to_db (&self, db: &Connection) -> Result<(), Error> {
    db.execute("UPDATE labels SET lastUsed = ?1 WHERE id = ?2", params![self.last_used, self.id])?;
    Ok(())
  }
}