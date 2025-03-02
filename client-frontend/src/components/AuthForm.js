import React, { useState } from "react";
import axios from "axios";
import {
  Paper,
  Typography,
  TextField,
  Button,
  Tabs,
  Tab,
  Box,
  Alert,  
} from "@mui/material";
import { useTheme } from "../context/ThemeContext";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


// Create an axios instance with authentication handling
export const axiosWithAuth = () => {
  const token = localStorage.getItem("token");
  
  // Handle guest mode - parse stored guest info instead of using API
  if (token && token.startsWith("guest-token-")) {
    const customInstance = {
      get: async (url) => {
        if (url.includes("/todos")) {
          const guestTodos = JSON.parse(localStorage.getItem("guestTodos") || "[]");
          return { data: guestTodos };
        }
        return Promise.reject(new Error("Operation not supported in guest mode"));
      },
      post: async (url, data) => {
        if (url.includes("/todos")) {
          const guestTodos = JSON.parse(localStorage.getItem("guestTodos") || "[]");
          const newTodo = {
            id: `guest-${Date.now()}`,
            ...data,
            completed: false,
          };
          const updatedTodos = [...guestTodos, newTodo];
          localStorage.setItem("guestTodos", JSON.stringify(updatedTodos));
          return { data: newTodo };
        }
        return Promise.reject(new Error("Operation not supported in guest mode"));
      },
      put: async (url, data) => {
        if (url.includes("/todos")) {
          const todoId = url.split("/").pop();
          const guestTodos = JSON.parse(localStorage.getItem("guestTodos") || "[]");
          const updatedTodos = guestTodos.map((todo) =>
            todo.id === todoId ? { ...todo, ...data } : todo
          );
          localStorage.setItem("guestTodos", JSON.stringify(updatedTodos));
          return { data: { message: "Task updated successfully" } };
        }
        return Promise.reject(new Error("Operation not supported in guest mode"));
      },
      delete: async (url) => {
        if (url.includes("/todos")) {
          const todoId = url.split("/").pop();
          const guestTodos = JSON.parse(localStorage.getItem("guestTodos") || "[]");
          const updatedTodos = guestTodos.filter((todo) => todo.id !== todoId);
          localStorage.setItem("guestTodos", JSON.stringify(updatedTodos));
          return { data: { message: "Task deleted successfully" } };
        }
        return Promise.reject(new Error("Operation not supported in guest mode"));
      }
    };
    return customInstance;
  }
  
  // Regular API mode with authentication token
  const instance = axios.create({
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
  
  return instance;
};

export const AuthForm = ({ setUser, refreshPage, openGuestDialog }) => {
  const { darkMode } = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setError(""); // Clear errors on tab change
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    
    // Validate form
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email: formData.email,
        password: formData.password,
      });
      
      // Show toast notification and wait for it to be visible
      toast.success("Login successful!");
      
      // Important: Add a delay before changing page state
      // This ensures the toast has time to display
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // After delay, save token and update user state
      localStorage.setItem("token", response.data.token);
      setUser(response.data.user);
      
      // Refresh page data after state changes
      if (refreshPage) refreshPage();
      
    } catch (error) {
      console.error("Login error:", error);
      setError(
        error.response?.data?.message || 
        error.response?.statusText || 
        "Invalid email or password"
      );
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };
  
  // In AuthForm.js - Updated handleRegister function

const handleRegister = async (e) => {
  e.preventDefault();
  setError("");
  
  // Validate form
  if (!formData.username || !formData.email || !formData.password) {
    setError("Please fill in all fields");
    return;
  }
  
  if (formData.password !== formData.confirmPassword) {
    setError("Passwords do not match");
    return;
  }
  
  if (formData.password.length < 6) {
    setError("Password must be at least 6 characters");
    return;
  }
  
  setIsLoading(true);
  
  try {
    await axios.post("http://localhost:5000/register", {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    });
    
    // First reset form and switch to login tab
    setFormData({
      ...formData,
      username: "",
      password: "",
      confirmPassword: "",
      // Keep the email for convenience
    });
    
    // Switch to login tab
    setActiveTab(0);
    
    // AFTER switching tabs, then show the toast
    // This ensures it displays on the login page
    setTimeout(() => {
      toast.success("Registration successful! Please log in.");
    }, 100);
    
  } catch (error) {
    console.error("Registration error:", error);
    setError(
      error.response?.data?.message || 
      error.response?.statusText || 
      "Registration failed. Please try again."
    );
    toast.error("Registration failed. Please try again.");
  } finally {
    setIsLoading(false);
  }
};

  return ( 
    <Paper
      elevation={10}
      sx={{
        p: 3,
        borderRadius: 5,
        backgroundColor: darkMode ? "#333" : "#f3f4f6",
        color: darkMode ? "#fff" : "#000",
        width: "80%",
        height: "100%",
        maxWidth: "350px",  // Set a max width
        padding: "20px",  // Reduce padding
        margin: "auto",  // Center the form
        marginRight: "-120px",
        marginTop: "50px",

      }}
    >
        <Typography variant="h6" align="center" gutterBottom>
          {activeTab === 0 ? "Login to your account" : "Create a new account"}
        </Typography>

        <Box sx={{ width: "100%", marginBottom: "20px" }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            centered
            sx={{
              "& .MuiTabs-indicator": {
                backgroundColor: darkMode ? "#90caf9" : "#1976d2",
              },
            }}
          >
            <Tab label="Login" sx={{ color: darkMode ? "#fff" : "#000" }} />
            <Tab label="Register" sx={{ color: darkMode ? "#fff" : "#000" }} />
          </Tabs>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {activeTab === 0 ? (
          // Login Form
          <form onSubmit={handleLogin}>
            <TextField
              label="Email"
              type="email"
              name="email"
              variant="outlined"
              fullWidth
              required
              margin="normal"
              value={formData.email}
              onChange={handleChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: darkMode ? 'rgba(255, 255, 255, 0.23)' : 'rgba(0, 0, 0, 0.23)',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
                },
                '& .MuiInputBase-input': {
                  color: darkMode ? '#fff' : '#000',
                },
              }}
            />
            <TextField
              label="Password"
              type="password"
              name="password"
              variant="outlined"
              fullWidth
              required
              margin="normal"
              value={formData.password}
              onChange={handleChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: darkMode ? 'rgba(255, 255, 255, 0.23)' : 'rgba(0, 0, 0, 0.23)',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
                },
                '& .MuiInputBase-input': {
                  color: darkMode ? '#fff' : '#000',
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
            {/* Guest Mode Button */}
            <Button 
              variant="outlined" 
              color="secondary" 
              fullWidth 
              sx={{ mb: 2 }}
              onClick={openGuestDialog}  // Calls the function from main component
            >
              Continue as Guest
            </Button>
          </form>
        ) : (
          // Register Form
          <form onSubmit={handleRegister}>
            <TextField
              label="Username"
              type="text"
              name="username"
              variant="outlined"
              fullWidth
              required
              margin="normal"
              value={formData.username}
              onChange={handleChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: darkMode ? 'rgba(255, 255, 255, 0.23)' : 'rgba(0, 0, 0, 0.23)',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
                },
                '& .MuiInputBase-input': {
                  color: darkMode ? '#fff' : '#000',
                },
              }}
            />
            <TextField
              label="Email"
              type="email"
              name="email"
              variant="outlined"
              fullWidth
              required
              margin="normal"
              value={formData.email}
              onChange={handleChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: darkMode ? 'rgba(255, 255, 255, 0.23)' : 'rgba(0, 0, 0, 0.23)',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
                },
                '& .MuiInputBase-input': {
                  color: darkMode ? '#fff' : '#000',
                },
              }}
            />
            <TextField
              label="Password"
              type="password"
              name="password"
              variant="outlined"
              fullWidth
              required
              margin="normal"
              value={formData.password}
              onChange={handleChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: darkMode ? 'rgba(255, 255, 255, 0.23)' : 'rgba(0, 0, 0, 0.23)',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
                },
                '& .MuiInputBase-input': {
                  color: darkMode ? '#fff' : '#000',
                },
              }}
            />
            <TextField
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              variant="outlined"
              fullWidth
              required
              margin="normal"
              value={formData.confirmPassword}
              onChange={handleChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: darkMode ? 'rgba(255, 255, 255, 0.23)' : 'rgba(0, 0, 0, 0.23)',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
                },
                '& .MuiInputBase-input': {
                  color: darkMode ? '#fff' : '#000',
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Register"}
            </Button>
            {/* Guest Mode Button */}
          <Button 
            variant="outlined" 
            color="secondary" 
            fullWidth 
            sx={{ mb: 2 }}
            onClick={openGuestDialog}  // Calls the function from main component
          >
            Continue as Guest
          </Button>
          </form>
        )}
      <ToastContainer position="top-right" autoClose={2000}  />
    </Paper>
  );
};

export default AuthForm;