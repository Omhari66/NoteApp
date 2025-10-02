import React, { useEffect, useState } from "react";

const NoteModal = ({ closeModal, addNote, currentNote, editNote }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (currentNote) {
      setTitle(currentNote.title);
      setDescription(currentNote.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [currentNote]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentNote) {
      editNote(currentNote._id, title, description);
    } else {
      addNote(title, description);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md md:max-w-lg p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 text-center">
          {currentNote ? "Edit Note" : "Add New Note"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title Input */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note Title"
             className="
    w-full p-3 rounded-lg border outline-none transition
    bg-white text-black
    focus:ring-2 focus:ring-indigo-400
    dark:bg-gray-800 dark:text-white dark:border-gray-600
    dark:focus:ring-indigo-500
  "
          />

          {/* Description Input */}
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Note Description"
            rows="4"
              className="
    w-full p-3 rounded-lg border outline-none transition
    bg-white text-black
    focus:ring-2 focus:ring-indigo-400
    dark:bg-gray-800 dark:text-white dark:border-gray-600
    dark:focus:ring-indigo-500
  "
          ></textarea>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-between gap-3">
            <button
              type="submit"
              className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition text-sm sm:text-base"
            >
              {currentNote ? "Update Note" : "➕ Add Note"}
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="flex-1 bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition text-sm sm:text-base"
            >
              ❌ Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteModal;
