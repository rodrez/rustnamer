#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod commands;

use commands::{bulk_rename, get_all_files};

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![bulk_rename, get_all_files])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
