use std::error::Error;
use rusqlite::Connection;

use crate::data_access::label::Label;
use super::DbRequest;

pub fn handle_label_request(db: &Connection, request: DbRequest) -> Result<String, Box<dyn Error>> {
  println!("label request - route: {}, data: {:?}", request.route, request.data);

  match request.route.as_str() {
    "create" => create(db, request.data),
    "read_by_category" => read_by_category(db, request.data),
    _ => panic!("route '{}' does not exist for '{}'", request.route, request.table),
  }
}

fn create (db: &Connection, data: Option<String>) -> Result<String, Box<dyn Error>> {
  let mut label = Label::new(data.unwrap())?;

  match Label::get_by_name(db, label.name.clone()) {
    Ok(mut fetched_label) => {
      fetched_label.last_used = label.last_used;
      fetched_label.update_to_db(db)?;
      let serialized_label = serde_json::to_string(&fetched_label)?;
      Ok(serialized_label)
    },
    Err(_) => {
      label.add_to_db(db)?;
      let serialized_label = serde_json::to_string(&label)?;
      Ok(serialized_label)
    }
  }
}

fn read_by_category (db: &Connection, data: Option<String>) -> Result<String, Box<dyn Error>> {
  let category_id = serde_json::from_str(&data.unwrap())?;
  let labels = Label::get_all_by_category(db, category_id)?;
  let serialized_labels = serde_json::to_string(&labels)?;
  Ok(serialized_labels)
}