import React from "react";
import TodoApp from "./components/TodoApp";
import { ThemeProvider } from "./context/ThemeContext"; // Import ThemeProvider

const App = () => {
  return (
    <ThemeProvider>
      <TodoApp />
    </ThemeProvider>
  );
};

export default App;
