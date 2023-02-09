#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

mod data_access;
mod handler;
use handler::DbRequest;

#[tauri::command]
fn send_db_request(request: DbRequest, db_path: String) -> Result<String, String> {
  match handler::handle_request(request, db_path) {
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
