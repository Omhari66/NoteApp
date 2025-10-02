import React, { useEffect, useState } from "react";
import {BASE_URL} from "../config";
import Navbar from "../components/Navbar";
import NoteModal from "../components/NoteModal";
import NoteCard from "../components/NoteCard";
import axios from "axios";
import { toast } from "react-toastify";
import { useTheme } from "../context/ThemeContext";
const Home = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [query, setQuery] = useState("");
  const [filteredNotes, setFilteredNotes] = useState([]);
  const {darkMode} =useTheme();

  useEffect(() => {
    setFilteredNotes(
      notes
        .filter(
          (note) =>
            note.title?.toLowerCase().includes(query.toLowerCase()) ||
            note.description?.toLowerCase().includes(query.toLowerCase())
        )
        .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0))
    );
  }, [query, notes]);

  const fetchNotes = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/note`, {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

      setNotes(data.notes);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };
  // Fetch all notes on component mount
  useEffect(() => {
    fetchNotes();
  }, []);

  // Close modal
  const closeModal = () => {
    setModalOpen(false);
    setCurrentNote(null); // clear current note when modal closes
  };

  // Open modal for editing
  const onEdit = (note) => {
    setCurrentNote(note);
    setModalOpen(true);
  };

  // Add a new note
  const addNote = async (title, description) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/note/add`,
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (data.success) {
        toast.success("note added");
        setNotes([...notes, data.note]); // update notes
        closeModal();
      }
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };
  const editNote = async (id, title, description) => {
    try {
      const { data } = await axios.put(
        `${BASE_URL}/api/note/${id}`,
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (data.success) {
        // Update the note in the existing array
        setNotes(
          notes.map((note) =>
            note._id === id ? { ...note, title, description } : note
          )
        );
        closeModal();
      }
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };
  const deleteNote = async (id) => {
    try {
      const { data } = await axios.delete(
        `${BASE_URL}/api/note/${id}`,

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (data.success) {
        // Update the note in the existing array
        toast.success("note deleted");
        fetchNotes();
      }
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };
  const togglePin = async (id) => {
    try {
      const { data } = await axios.put(
        `${BASE_URL}/api/note/pin/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (data.success) {
        setNotes(notes.map((note) => (note._id === id ? data.note : note)));
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <Navbar setQuery={setQuery} />

      {/* Notes Grid */}
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              onEdit={onEdit}
              deleteNote={deleteNote}
              togglePin={togglePin}
            />
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center mt-20">
            No notes found. Click the + button to add one!
          </p>
        )}
      </div>

      {/* Floating Add Note Button */}
   <button
  onClick={() => setModalOpen(true)}
  className="fixed right-6 bottom-6 text-3xl font-bold p-5 rounded-full shadow-lg transition
    bg-teal-500 text-white hover:bg-teal-600
    dark:bg-teal-700 dark:text-white dark:hover:bg-teal-800"
>
  +
</button>


      {/* Note Modal */}
      {isModalOpen && (
        <NoteModal
          closeModal={closeModal}
          addNote={addNote}
          currentNote={currentNote}
          editNote={editNote}
        />
      )}
    </div>
  );
};

export default Home;
