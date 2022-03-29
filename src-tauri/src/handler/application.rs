use std::error::Error;
use rusqlite::Connection;

use crate::data_access::application::ApplicationData;
use super::DbRequest;

pub fn handle_application_request(db: &Connection, request: DbRequest) -> Result<String, Box<dyn Error>> {
  println!("application request - route: {}, data: {:?}", request.route, request.data);

  match request.route.as_str() {
    "read" => read(db),
    "update_last_opened" => update_last_opened(db, request.data),
    _ => panic!("route '{}' does not exist for '{}'", request.route, request.table),
  }
}

fn read(db: &Connection) -> Result<String, Box<dyn Error>> {
  let app_data = ApplicationData::get_application_data(db)?;
  let serialized_app_data = serde_json::to_string(&app_data)?;
  Ok(serialized_app_data)
}

fn update_last_opened(db: &Connection, data: Option<String>) -> Result<String, Box<dyn Error>> {
  let last_opened = serde_json::from_str(&data.unwrap())?;
  let app_data = ApplicationData::update_last_opened(db, last_opened)?;
  let serialized_app_data = serde_json::to_string(&app_data)?;
  Ok(serialized_app_data)
}