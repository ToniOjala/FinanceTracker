use std::error::Error;
use rusqlite::Connection;

use crate::data_access::recurring_expense::RecurringExpense;
use super::DbRequest;

pub fn handle_recurring_expense_request(db: &Connection, request: DbRequest) -> Result<String, Box<dyn Error>> {
  println!("recurring expense request - route: {}, data: {:?}", request.route, request.data);

  match request.route.as_str() {
    "create" => create(db, request.data),
    "read" => read(db),
    "update" => update(db, request.data),
    "delete" => delete(db, request.data),
    _ => panic!("route '{}' does not exist for '{}'", request.route, request.table),
  }
}

fn create (db: &Connection, data: Option<String>) -> Result<String, Box<dyn Error>> {
  let mut expense = RecurringExpense::new(data.unwrap())?;
  expense.add_to_db(db)?;
  let serialized_expense = serde_json::to_string(&expense)?;
  Ok(serialized_expense)
}

fn read (db: &Connection) -> Result<String, Box<dyn Error>> {
  let expenses = RecurringExpense::get_all_from_db(db)?;
  let serialized_expenses = serde_json::to_string(&expenses)?;
  Ok(serialized_expenses)
}

fn update (db: &Connection, data: Option<String>) -> Result<String, Box<dyn Error>> {
  let expense = RecurringExpense::new(data.unwrap())?;
  expense.update_to_db(db)?;
  let serialized_expense = serde_json::to_string(&expense)?;
  Ok(serialized_expense)
}

fn delete (db: &Connection, data: Option<String>) -> Result<String, Box<dyn Error>> {
  let expense = RecurringExpense::new(data.unwrap())?;
  expense.delete_from_db(db)?;
  let serialized_expense = serde_json::to_string(&expense)?;
  Ok(serialized_expense)
}