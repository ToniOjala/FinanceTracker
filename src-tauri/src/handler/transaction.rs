use std::{collections::HashMap, error::Error};
use rusqlite::Connection;
use serde::Deserialize;

use crate::data_access::balance_log::BalanceLog;
use crate::data_access::transaction::{NewTransaction, Transaction};
use crate::data_access::category::Category;
use super::DbRequest;

pub fn handle_transaction_request(db: &Connection, request: DbRequest) -> Result<String, Box<dyn Error>> {
  println!("transaction request - route: {}, data: {:?}", request.route, request.data);

  match request.route.as_str() {
    "create" => create(db, request.data),
    "read_monthly_data" => read_monthly_data(db, request.data),
    "read_yearly_data" => read_yearly_data(db, request.data),
    "update" => update(db, request.data),
    "delete" => delete(db, request.data),
    _ => panic!("route '{}' does not exist for '{}'", request.route, request.table),
  }
}

fn create (db: &Connection, data: Option<String>) -> Result<String, Box<dyn Error>> {
  let mut new_transaction = NewTransaction::new(data.unwrap())?;
  let saved_transaction = new_transaction.add_to_db(db)?;

  if new_transaction.ctype == "income" {
    for (category_id, amount) in new_transaction.balance_additions.unwrap().iter() {
      let mut category = Category::get_from_db(db, *category_id)?;
      category.balance += amount;
      category.update_to_db(db)?;

      let mut balance_log = BalanceLog::new(
        *category_id, saved_transaction.id, *amount, 
        saved_transaction.date.clone(), saved_transaction.label.clone()
      );
      balance_log.add_to_db(db)?;
    }
  }
  else {
    let mut category = Category::get_from_db(db, saved_transaction.category_id)?;
    category.balance -= saved_transaction.amount;
    category.update_to_db(db)?;

    let mut balance_log = BalanceLog::from_transaction(&saved_transaction);
    balance_log.add_to_db(db)?;
  }

  let serialized_transaction = serde_json::to_string(&saved_transaction)?;
  Ok(serialized_transaction)
}

#[derive(Deserialize)]
struct MonthlyPayload {
  year: i16,
  month: i8,
}

fn read_monthly_data (db: &Connection, data: Option<String>) -> Result<String, Box<dyn Error>> {
  let d: MonthlyPayload = serde_json::from_str(&data.unwrap()).unwrap();
  let transactions = Transaction::get_by_month_from_db(db, d.year, d.month)?;
  let result = serde_json::to_string(&transactions)?;
  Ok(result)
}

#[derive(Deserialize)]
struct YearlyPayload {
  year: i16,
}

fn read_yearly_data (db: &Connection, data: Option<String>) -> Result<String, Box<dyn Error>> {
  let mut yearly_data: HashMap<String, Vec<f64>> = HashMap::new();
  let mut total_expense: Vec<f64> = vec![0.0; 13];
  let mut total_income: Vec<f64> = vec![0.0; 13];
  let mut sum_of_total_expense: f64 = 0.0;
  let mut sum_of_total_income: f64 = 0.0;
  let d: YearlyPayload = serde_json::from_str(&data.unwrap()).unwrap();

  let categories = Category::get_all_from_db(db, d.year)?;

  for category in categories {
    let mut month: Vec<f64> = vec![0.0; 13];
    let mut year_sum: f64 = 0.0;
    for m in 0..12 {
      let transactions = Transaction::get_by_month_and_category(db, d.year, m + 1, category.id.unwrap())?;
      let month_sum: f64 = transactions.iter().fold(0.0, |acc, tr| acc + tr.amount);
      year_sum += month_sum;
      if category.ctype == "expense" {
        total_expense[m as usize] += month_sum;
        sum_of_total_expense += month_sum;
      }
      else {
        total_income[m as usize] += month_sum;
        sum_of_total_income += month_sum;
      }
      month[m as usize] = month_sum;
    };
    month[12] = year_sum;
    yearly_data.insert(category.name, month);
  }
  total_income[12] = sum_of_total_income;
  total_expense[12] = sum_of_total_expense;

  yearly_data.insert("total_income".into(), total_income);
  yearly_data.insert("total_expense".into(), total_expense);

  let serialized_data = serde_json::to_string(&yearly_data)?;
  Ok(serialized_data)
}

fn update (db: &Connection, data: Option<String>) -> Result<String, Box<dyn Error>> {
  let transaction = Transaction::parse(data.unwrap())?;
  let old_transaction = Transaction::get_from_db(&db, transaction.id)?;
  let difference: f64 = transaction.amount - old_transaction.amount;
  transaction.update_to_db(&db)?;

  let mut balance_log = BalanceLog::get_from_db_with_transaction(&db, transaction.id)?;
  balance_log.amount = -transaction.amount;
  balance_log.update_to_db(&db)?;

  let mut category = Category::get_from_db(&db, transaction.category_id)?;
  category.balance -= difference;
  category.update_to_db(&db)?;

  let serialized_transaction = serde_json::to_string(&transaction)?;
  Ok(serialized_transaction)
}

fn delete (db: &Connection, data: Option<String>) -> Result<String, Box<dyn Error>> {
  let transaction = Transaction::parse(data.unwrap())?;
  let balance_log = BalanceLog::get_from_db_with_transaction(&db, transaction.id)?;
  balance_log.delete_from_db(&db)?;
  transaction.delete_from_db(&db)?;

  let mut category = Category::get_from_db(&db, transaction.category_id)?;
  category.balance += transaction.amount;
  category.update_to_db(&db)?;

  let serialized_transaction = serde_json::to_string(&transaction)?;
  Ok(serialized_transaction)
}