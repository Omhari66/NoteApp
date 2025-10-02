import React from "react";

const NoteCard = ({ note ,onEdit,deleteNote,togglePin}) => {
  return (
    <div className="bg-white dark:bg-gray-800  shadow-md rounded-xl p-5 w-full max-w-sm border border-gray-200 hover:shadow-lg transition relative ">
      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
        {note.title}
      </h2>

      {/* Description */}
      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
        {note.description}
      </p>
     <button
  onClick={() => togglePin(note._id)}
  className={`absolute top-2 right-2 px-2 py-1 rounded-full text-sm ${
    note.pinned
      ? "bg-yellow-400 text-black"
      : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
  }`}
>
  {note.pinned ? "📌" : "📍"}
</button>

      {/* Buttons */}
      <div className="flex justify-end space-x-3">
        <button className="px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-100 rounded-lg hover:bg-indigo-200 transition" onClick={()=>onEdit(note)}>
          ✏️ Edit
        </button>
        <button className="px-4 py-2 text-sm font-medium text-red-600 bg-red-100 rounded-lg hover:bg-red-200 transition" onClick={()=>deleteNote(note._id)}>
          🗑 Delete
        </button>
      </div>
    </div>
  );
};

export default NoteCard;  