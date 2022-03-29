use std::error::Error;
use rusqlite::Connection;

use crate::data_access::category::Category;
use super::DbRequest;

pub fn handle_category_request(db: &Connection, request: DbRequest) -> Result<String, Box<dyn Error>> {
  println!("category request - route: {}, data: {:?}", request.route, request.data);

  match request.route.as_str() {
    "create" => create(db, request.data),
    "read" => read(db, request.data),
    "update" => update(db, request.data),
    "delete" => delete(db, request.data),
    _ => panic!("route '{}' does not exist for '{}'", request.route, request.table),
  }
}

fn create (db: &Connection, data: Option<String>) -> Result<String, Box<dyn Error>> {
  let mut category = Category::new(data.unwrap())?;
  category.add_to_db(db)?;
  let serialized_category = serde_json::to_string(&category)?;
  Ok(serialized_category)
}

fn read (db: &Connection, data: Option<String>) -> Result<String, Box<dyn Error>> {
  let year: i16 = serde_json::from_str(&data.unwrap())?;
  let categories = Category::get_all_from_db(db, year)?;
  let serialized_categories = serde_json::to_string(&categories)?;
  Ok(serialized_categories)
}

fn update (db: &Connection, data: Option<String>) -> Result<String, Box<dyn Error>> {
  let category = Category::new(data.unwrap())?;
  category.update_to_db(db)?;
  let serialized_category = serde_json::to_string(&category)?;
  Ok(serialized_category)
}

fn delete (db: &Connection, data: Option<String>) -> Result<String, Box<dyn Error>> {
  let category = Category::new(data.unwrap())?;
  category.delete_from_db(db)?;
  let serialized_category = serde_json::to_string(&category)?;
  Ok(serialized_category)
}