import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/ContextProvider";
import { useTheme } from "../context/ThemeContext";
import noteLogo from "../assets/note.png";
const Navbar = ({ setQuery }) => {
  const { user, logout } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-indigo-600 shadow-md px-6 py-4 flex items-center justify-between">
      {/* Left Logo */}
      <div className="text-white font-bold text-xl tracking-wide flex items-center space-x-2">
        <img src={noteLogo} alt="Note App Logo" className="h-8 w-8" />
        <Link to="/">NoteApp</Link>
      </div>

      {/* Search Bar */}
      <div className="flex-1 mx-6">
        <input
          type="text"
          placeholder="Search notes..."
          className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {!user ? (
          <>
            <Link
              to="/login"
              className="text-white hover:bg-indigo-700 px-4 py-2 rounded-lg transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
            >
              Signup
            </Link>
          </>
        ) : (
          <>
            <span className="text-white font-medium">{user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
      <button
        onClick={toggleTheme}
        className="ml-4 px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
      >
        {darkMode ? "🌙 Dark" : "☀️ Light"}
      </button>
    </nav>
  );
};

export default Navbar;
