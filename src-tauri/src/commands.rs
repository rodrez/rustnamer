use std::{fs, path::PathBuf};
use tauri::command;

#[command]
pub fn bulk_rename(directory: &str, old_pattern: &str, new_pattern: &str) -> String {
    let paths = fs::read_dir(&directory).unwrap();

    for path in paths {
        let path = path.unwrap();
        let file_name = path.file_name().into_string().unwrap();
        let new_name = file_name.replace(old_pattern, new_pattern);
        let new_path = PathBuf::from(&directory).join(new_name);
        fs::rename(path.path(), new_path).unwrap();
    }

    "Completed!".to_string()
}

#[command]
pub fn get_all_files(directory: &str) -> Vec<String> {
    let paths = fs::read_dir(directory).unwrap();
    let mut paths_array = Vec::new();

    for path in paths {
        let path = path.unwrap();
        paths_array.push(path.file_name().into_string().unwrap());
    }

    paths_array
}
