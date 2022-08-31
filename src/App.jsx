import { useState } from "react";
import "./css/tailwind.css";
import "./App.css";
import { open } from "@tauri-apps/api/dialog";
import { invoke } from "@tauri-apps/api";

function App() {
  const [directory, setDirectory] = useState("");
  const [oldPattern, setOldPattern] = useState("copy");
  const [newPattern, setNewPattern] = useState("non copy");
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
      <h2 className="uppercase text-3xl font-semibold">Rustnamer</h2>
      <p className="read-the-docs">
        Select a directory a update an old pattern with a new one.
      </p>
      <div className="flex w-full gap-x-4">
        <div className="text-left">
          <p>Old Pattern</p>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-amber-500 focus:ring-amber-500 focus:border-ambers-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-amber-500 dark:focus:border-amber-500"
            onChange={(e) => setOldPattern(e.target.value)}
            value={oldPattern}
          />
        </div>
        <div className="text-left">
          <p>New Pattern</p>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-amber-500 dark:focus:border-amber-500"
            onChange={(e) => setNewPattern(e.target.value)}
            value={newPattern}
          />
        </div>
      </div>
      <button onClick={getFiles}>Select Folder</button>
      <div>
        <p>{directory}</p>
        Status: {completeMessage}
      </div>
      <button className="bg-amber-500 text-slate-800" onClick={rename}>
        Rename
      </button>
    </div>
  );
}

export default App;
