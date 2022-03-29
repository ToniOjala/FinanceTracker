use std::error::Error;
use rusqlite::Connection;
use serde::Deserialize;

use crate::data_access::balance_log::BalanceLog;
use super::DbRequest;

pub fn handle_balancelog_request (db: &Connection, request: DbRequest) -> Result<String, Box<dyn Error>> {
  println!("balancelog request - route: {}, payload: {:?}", request.route, request.data);

  match request.route.as_str() {
    "read" => read(db, request.data.unwrap()),
    "readCount" => read_count(db, request.data.unwrap()),
    _ => panic!("route '{}' does not exist for '{}'", request.route, request.table),
  }
}

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct ReadPayload {
  category_id: i64,
  page: i8,
}

fn read (db: &Connection, payload: String) -> Result<String, Box<dyn Error>> {
  let parsed_payload: ReadPayload = serde_json::from_str(payload.as_str())?;
  let balance_logs = BalanceLog::get_from_db_by_category_and_page(db, parsed_payload.category_id, parsed_payload.page)?;
  let serialized_balance_logs = serde_json::to_string(&balance_logs)?;
  Ok(serialized_balance_logs)
}

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct ReadCountPayload {
  category_id: i64,
}

fn read_count(db: &Connection, payload: String) -> Result<String, Box<dyn Error>> {
  let parsed_payload: ReadCountPayload = serde_json::from_str(payload.as_str())?;
  let count = BalanceLog::get_count_from_db(db, parsed_payload.category_id)?;
  let serialized_count = serde_json::to_string(&count)?;
  Ok(serialized_count)
}