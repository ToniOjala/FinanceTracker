use std::error::Error;
use rusqlite::Connection;

use crate::data_access::notification::Notification;
use super::DbRequest;

pub fn handle_notification_request(db: &Connection, request: DbRequest) -> Result<String, Box<dyn Error>> {
  println!("notification request - route: {}, data: {:?}", request.route, request.data);

  match request.route.as_str() {
    "create" => create(db, request.data),
    "read" => read(db),
    "update" => update(db, request.data),
    "delete" => delete(db, request.data),
    _ => panic!("route '{}' does not exist for '{}'", request.route, request.table),
  }
}

fn create (db: &Connection, data: Option<String>) -> Result<String, Box<dyn Error>> {
  let mut notification = Notification::new(data.unwrap())?;
  notification.add_to_db(db)?;
  let serialized_notification = serde_json::to_string(&notification)?;
  Ok(serialized_notification)
}

fn read (db: &Connection) -> Result<String, Box<dyn Error>> {
  let notifications = Notification::get_all_from_db(db)?;
  let serialized_categories = serde_json::to_string(&notifications)?;
  Ok(serialized_categories)
}

fn update (db: &Connection, data: Option<String>) -> Result<String, Box<dyn Error>> {
  let mut notification = Notification::new(data.unwrap())?;
  notification.update_to_db(db)?;
  notification.read = Some(true);
  let serialized_notification = serde_json::to_string(&notification)?;
  Ok(serialized_notification)
}

fn delete (db: &Connection, data: Option<String>) -> Result<String, Box<dyn Error>> {
  let notification = Notification::new(data.unwrap())?;
  notification.delete_from_db(db)?;
  let serialized_notification = serde_json::to_string(&notification)?;
  Ok(serialized_notification)
}