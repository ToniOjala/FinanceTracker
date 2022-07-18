use std::error::Error;
use rusqlite::Connection;
use serde::{Deserialize, Serialize};

use application::handle_application_request;
use balance_log::handle_balancelog_request;
use budget::handle_budget_request;
use category::handle_category_request;
use label::handle_label_request;
use notification::handle_notification_request;
use recurring_expense::handle_recurring_expense_request;
use transaction::handle_transaction_request;

mod application;
mod balance_log;
mod budget;
mod category;
mod label;
mod notification;
mod recurring_expense;
mod transaction;

#[derive(Serialize, Deserialize)]
pub struct DbRequest {
  table: String,
  route: String,
  data: Option<String>
}

pub fn handle_request(request: DbRequest) -> Result<String, Box<dyn Error>> {
  let db = Connection::open("../db/testdb.db").expect("Not able to open database");
  let result = match request.table.as_str() {
    "application" => handle_application_request(&db, request),
    "balanceLogs" => handle_balancelog_request(&db, request),
    "budgets" => handle_budget_request(&db, request),
    "categories" => handle_category_request(&db, request),
    "labels" => handle_label_request(&db, request),
    "notifications" => handle_notification_request(&db, request),
    "recurringExpenses" => handle_recurring_expense_request(&db, request),
    "transactions" => handle_transaction_request(&db, request),
    _ => panic!("Error: table '{}' does not exist.", request.table),
  };

  db.close().expect("Error while trying to close database connection");
  result
}