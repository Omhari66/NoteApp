
import React from "react";
import './index.css'
import ReactDOM from "react-dom/client";
import App from "./App";
import ContextProvider from "./context/ContextProvider";
import { ThemeProvider } from "./context/ThemeContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
    <ContextProvider>
      <App />
    </ContextProvider>
    </ThemeProvider>
  </React.StrictMode>
);