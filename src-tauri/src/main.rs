#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod commands;

use commands::bulk_rename;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![bulk_rename])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
