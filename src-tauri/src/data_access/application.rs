use rusqlite::{params, Connection, Error};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ApplicationData {
  #[serde(rename = "lastOpened")]
  pub last_opened: String,
}

impl ApplicationData {
  pub fn get_application_data(db: &Connection) -> Result<ApplicationData, Error> {
    let mut stmt = db.prepare("SELECT * FROM application WHERE id = ?")?;
    let mut mapped_rows = stmt.query_map(params![0], |row| {
      Ok(ApplicationData {
        last_opened: row.get(1)?,
      })
    })?;

    let app_data = mapped_rows.next().unwrap()?;
    Ok(app_data)
  }

  pub fn update_last_opened(db: &Connection, last_opened: String) -> Result<(), Error> {
    db.execute(
      "UPDATE application SET lastOpened = ?",
      params![last_opened],
    )?;
    Ok(())
  }
}
