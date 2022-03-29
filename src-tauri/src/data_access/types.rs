use serde::Deserialize;

#[derive(Deserialize)]
pub struct BalanceLog {
  pub category_id: i64,
  pub transaction_id: i64,
  pub amount: f64,
  pub date: String,
  pub label: String,
}

#[derive(Deserialize)]
pub struct Budget {
  pub category_id: i64,
  pub amount: f64,
  pub start_date: String,
}

// #[derive(Deserialize)]
// pub struct Category {
//   pub name: String,
//   pub ctype: String,
//   pub created: String,
// }

#[derive(Deserialize)]
pub struct Label {
  pub category_id: i64,
  pub name: String,
  pub last_used: String,
}

#[derive(Deserialize)]
pub struct Notification {
  pub message: String,
  pub read: bool,
  pub date: String,
}

#[derive(Deserialize)]
pub struct RecurringExpense {
  pub category_id: i64,
  pub name: String,
  pub amount: f64,
  pub recurs: bool,
  pub day: i8,
  pub month: i8,
  pub notify_days_before: i8,
}

#[derive(Deserialize)]
pub struct Transaction {
  pub category_id: i64,
  pub amount: f64,
  pub date: String,
  pub label: String,
}