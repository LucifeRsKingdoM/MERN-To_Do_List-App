// src/components/TodoApp.js

import React, { useEffect, useState, useCallback } from "react";
import { Container, Paper, Typography, Switch, Button, List, ListItem, ListItemText, Checkbox, IconButton, TextField } from "@mui/material";
import { DarkMode, LightMode, Delete } from "@mui/icons-material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "../context/ThemeContext";
import { jwtDecode } from "jwt-decode";

import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Select, MenuItem } from "@mui/material";
import { AddCircle } from "@mui/icons-material";

import LandingPage from "./LandingPage";  // <--- The new landing page
import { axiosWithAuth } from "./AuthForm"; // <--- For fetching & editing todos

const API_URL = "http://localhost:5000/todos";


const TodoApp = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [dueDate, setDueDate] = useState(null); // now inside the component
  const [priority, setPriority] = useState("Medium"); // now inside the component
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  // Fetch todos
  const fetchTodos = useCallback(async () => {
    try {
      const response = await axiosWithAuth().get(API_URL);
      console.log("Fetched tasks:", response.data);
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
      toast.error("Failed to fetch tasks. Please login again.");
      handleLogout();
    }
  }, []); // Empty array means it doesn't depend on any other variables.

  // Check token on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        if (token.startsWith("guest-token-")) {
          const guestUser = JSON.parse(localStorage.getItem("guestUser"));
          setUser(guestUser);
        } else {
          const decodedUser = jwtDecode(token);
          setUser(decodedUser);
        }
        fetchTodos();
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("guestUser");
        localStorage.removeItem("guestTodos");
        setUser(null);
      }
    }
  }, [fetchTodos]);  // Now fetchTodos is a dependency
  

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  
  const handleAddTodo = async () => {
    if (!newTask.trim()) return toast.warning("Task cannot be empty!");
  
    let formattedDueDate = null;
    if (dueDate) {
      formattedDueDate = `${dueDate.getFullYear()}-${(dueDate.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${dueDate.getDate().toString().padStart(2, "0")}`;
    }
  
    try {
      const response = await axiosWithAuth().post(API_URL, {
        task: newTask,
        due_date: formattedDueDate,
        priority: priority,
      });
      console.log("Task added:", response.data);
      
      // Option: Re-fetch all tasks to ensure SQL data is up-to-date:
      await fetchTodos();
  
      setNewTask("");
      setDueDate(null);
      toast.success("Task added successfully!");
    } catch (error) {
      console.error("Error adding task:", error);
      toast.error("Failed to add task. Please try again.");
    }
  };
  
  
  const handleToggleComplete = async (id, completed) => {
    try {
      await axiosWithAuth().put(`${API_URL}/${id}`, { completed: !completed });
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !completed } : todo
        )
      );
      toast.info("Task updated!");
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Failed to update task. Please try again.");
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await axiosWithAuth().delete(`${API_URL}/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
      toast.error("Task deleted!");
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("guestUser");
    localStorage.removeItem("guestTodos");
    setUser(null);
    setTodos([]);
    toast.info("Logged out successfully");
  };

  // If user is not logged in, show the landing page
  if (!user) {
    return (
      <LandingPage
        setUser={setUser}
        refreshPage={fetchTodos}
      />
    );
  }

  const getDueDateStatus = (dueDate) => {
    if (!dueDate) return "No due date";
    
    const now = new Date();
    const due = new Date(dueDate);
  
    const nowDateOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const dueDateOnly = new Date(due.getFullYear(), due.getMonth(), due.getDate());
  
    const timeDiff = dueDateOnly - nowDateOnly;
    const daysLeft = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  
    if (daysLeft < 0) {
      return `❌ Overdue (${Math.abs(daysLeft)} days ago)`;
    } else if (daysLeft === 0) {
      return "⏳ Due today";
    } else if (daysLeft === 1) {
      return "📅 Due tomorrow";
    } else {
      return `📅 Due in ${daysLeft} days`;
    }
  };
  

  // If user is logged in, show the Todo UI
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper
        elevation={10}
        sx={{
          p: 3,
          borderRadius: 2,
          backgroundColor: darkMode ? "#333" : "#f3f4f6",
          color: darkMode ? "#fff" : "#000",
        }}
      >
        {/* Header section */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
          <div>
            <Typography variant="h6">
              Welcome, {user.username || user.email}
              {user.isGuest && " (Guest Mode)"}!
            </Typography>
            <Typography variant="h4" gutterBottom>
              ✅ Fancy To-Do List
            </Typography>

            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: darkMode ? "#fff" : "#333",
                marginBottom: "15px",
              }}
            >
              📅 {currentDateTime.toLocaleDateString()} | ⏰ {currentDateTime.toLocaleTimeString()}
            </Typography>

          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Switch
              checked={darkMode}
              onChange={toggleDarkMode}
              icon={<LightMode />}
              checkedIcon={<DarkMode />}
            />
            <Button onClick={handleLogout} color="error">
              Logout
            </Button>
          </div>
        </div>

        {/* Input for new task */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px", alignItems: "center" }}>
          <TextField
            fullWidth
            label="Add a new task..."
            variant="outlined"
            style={{backgroundColor: darkMode ? "#555" : "#fff"}}
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Due"
              value={dueDate}
              style={{backgroundColor: darkMode ? "#555" : "#fff"}}
              onChange={(newValue) => setDueDate(newValue)}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          
          <Select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            variant="outlined"
            style={{ width: "120px", backgroundColor: darkMode ? "#555" : "#fff" }}
          >
            <MenuItem value="High">🔥 High</MenuItem>
            <MenuItem value="Medium">⚡ Medium</MenuItem>
            <MenuItem value="Low">🟢 Low</MenuItem>
          </Select>
          
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddTodo}
            startIcon={<AddCircle />}
          >
            Add
          </Button>
        </div>

        {/* Task list */}
        {todos.length === 0 ? (
          <Typography align="center" sx={{ mt: 2 }}>
            No tasks yet. Add your first task above!
          </Typography>
        ) : (
          <List>
            {todos.map((todo) => (
              <ListItem
                key={todo.id}
                secondaryAction={
                  <IconButton
                    edge="end"
                    onClick={() => handleDeleteTodo(todo.id)}
                    color="error"
                  >
                    <Delete />
                  </IconButton>
                }
                sx={{
                  backgroundColor: darkMode ? "#555" : "#fff",
                  color: darkMode ? "#fff" : "#000",
                  borderRadius: "10px",
                  mb: 1,
                }}
              >
                <Checkbox
                  checked={todo.completed}
                  onChange={() => handleToggleComplete(todo.id, todo.completed)}
                />
                <ListItemText
                  primary={`${todo.task} (${todo.priority})`}
                  secondary={
                    todo.due_date ? getDueDateStatus(todo.due_date) : "No due date"
                  }
                  sx={{
                    textDecoration: todo.completed ? "line-through" : "none",
                    color:
                      todo.priority === "High"
                        ? darkMode
                          ? "#ff6666"
                          : "red"
                        : todo.priority === "Medium"
                        ? darkMode
                          ? "#ffaa66"
                          : "orange"
                        : darkMode
                        ? "#66ff66"
                        : "green",
                  }}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
      <ToastContainer position="top-right" autoClose={2000} />
    </Container>
  );
};

export default TodoApp;
