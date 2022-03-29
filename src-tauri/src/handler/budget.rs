use std::error::Error;
use rusqlite::Connection;

use crate::data_access::budget::Budget;
use super::DbRequest;

pub fn handle_budget_request(db: &Connection, request: DbRequest) -> Result<String, Box<dyn Error>> {
  println!("budget request - route: {}, data: {:?}", request.route, request.data);

  match request.route.as_str() {
    "create" => create(db, request.data),
    "read_latest" => read_latest(db, request.data),
    _ => panic!("route '{}' does not exist for '{}'", request.route, request.table),
  }
}

fn create (db: &Connection, data: Option<String>) -> Result<String, Box<dyn Error>> {
  let mut budget = Budget::new(data.unwrap())?;

  match Budget::get_by_category_and_date(db, &budget.category_id, &budget.start_date) {
    Ok(mut fetched_budget) => {
      fetched_budget.amount = budget.amount;
      fetched_budget.update_to_db(db)?;
      let serialized_budget = serde_json::to_string(&fetched_budget)?;
      Ok(serialized_budget)
    },
    Err(_) => {
      budget.add_to_db(db)?;
      let serialized_budget = serde_json::to_string(&budget)?;
      Ok(serialized_budget)
    }
  }
}

fn read_latest (db: &Connection, data: Option<String>) -> Result<String, Box<dyn Error>> {
  let date = serde_json::from_str(&data.unwrap())?;
  let budgets = Budget::get_latest_per_category(db, date)?;
  let serialized_budgets = serde_json::to_string(&budgets)?;
  Ok(serialized_budgets)
}