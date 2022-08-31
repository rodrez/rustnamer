import { useState } from "react";
import "./css/tailwind.css";
import "./App.css";
import { open } from "@tauri-apps/api/dialog";
import { invoke } from "@tauri-apps/api";

function App() {
  const [directory, setDirectory] = useState("");
  const [oldPattern, setOldPattern] = useState("ABC");
  const [newPattern, setNewPattern] = useState("DEF");
  const [completeMessage, setCompleteMessage] = useState("");

  async function getFiles() {
    let selected = await open({
      directory: true,
    });
    if (selected) {
      setDirectory(selected);
    }
  }

  // Rust renamer
  function rename() {
    setCompleteMessage("Renaming the files.");
    invoke("bulk_rename", {
      directory: directory,
      oldPattern: oldPattern,
      newPattern: newPattern,
    }).then((response) => setCompleteMessage(response));
  }

  return (
    <div className="space-y-8">
      <div className="mx-auto flex justify-center">
        <a href="_" target="_blank">
          <img
            src="/logo/rustnamer.png"
            className=" h-24"
            alt="Rustnamer logo"
          />
        </a>
      </div>
      <h2 className="uppercase text-3xl font-semibold text-center">
        Rustnamer
      </h2>

      <div>
        <p className="read-the-docs">
          Select a directory to update an old pattern with a new one.
        </p>

        <button
          onClick={getFiles}
          className="px-5 hover:scale-[1.02] transition-transform shadow-md py-2.5 w-full text-center text-lg font-bold text-white bg-gradient-to-br from-[#383f6b] to-[#141727] rounded-lg"
        >
          Select Folder
        </button>
        <p className="text-sm mb-4 mt-1 read-the-docs">
          Selected:
          <span className=" text-green-500">{directory}</span>
        </p>
        <div className="mb-6">
          <label
            htmlFor="old_pattern"
            className="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300"
          >
            Old Pattern
          </label>
          <input
            id="old_pattern"
            className="bg-transparent border-2 border-gray-600 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-amber-600 focus:outline-amber-900 focus:border-amber-400 block w-full p-2.5 dark:text-white"
            placeholder="ABC"
            onChange={(e) => setOldPattern(e.target.value)}
            value={oldPattern}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="new_pattern"
            className="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300"
          >
            New Pattern
          </label>
          <input
            id="new_pattern"
            className="bg-transparent border-2 border-gray-600 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-amber-600 focus:outline-slate-900 focus:border-amber-300 block w-full p-2.5 dark:text-white"
            placeholder="DEF"
            onChange={(e) => setNewPattern(e.target.value)}
            value={newPattern}
          />
        </div>
        <button
          onClick={rename}
          disabled={!directory}
          className="w-full text-white bg-gradient-to-br from-[#ec9f05] to-[#ff4e00] rounded-lg text-lg font-semibold px-5 py-2.5 mb-2 items-center shadow-md shadow-gray-300 text-center dark:shadow-gray-900 hover:scale-[1.02] transition-transform"
        >
          RENAME
        </button>
        <div className="mt-12">
          {completeMessage}
          <div className="overflow-hidden rounded-full bg-slate-800 ">
            <div
              className="h-2 rounded-full bg-green-600 transform"
              style={{
                width: completeMessage.includes("Completed") ? "100%" : "0%",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
