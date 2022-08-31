use std::fs;
use tauri::command;

pub fn rename_file(file: &str, old_pattern: &str, new_pattern: &str) -> std::io::Result<()> {
    fs::rename(&file, &file.replace(old_pattern, &new_pattern))?;
    Ok(())
}

#[command]
pub fn bulk_rename(directory: &str, old_pattern: &str, new_pattern: &str) -> String {
    let paths = fs::read_dir(&directory).unwrap();

    for dir_entry in paths {
        let file_name = dir_entry
            .as_ref()
            .unwrap()
            .path()
            .file_name()
            .unwrap()
            .to_string_lossy()
            .into_owned();

        if file_name.clone().contains(&old_pattern) {
            rename_file(&file_name, &old_pattern, &new_pattern).unwrap();
        }
    }
    format!("Bulk renaming completed.")
}
