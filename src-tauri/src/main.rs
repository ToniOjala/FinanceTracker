#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use handler::{DbRequest};
mod handler;
mod data_access;

#[tauri::command]
fn send_db_request(request: DbRequest) -> Result<String, String> {
  match handler::handle_request(request) {
    Ok(serialized_data) => Ok(serialized_data),
    Err(error) => Err(error.to_string()),
  }
}

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler!(send_db_request))
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
