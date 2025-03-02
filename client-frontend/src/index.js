import React from "react";
import ReactDOM from "react-dom/client"; // ✅ Import createRoot
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext"; // Import ThemeProvider

const root = ReactDOM.createRoot(document.getElementById("root")); // ✅ Fix here
root.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
