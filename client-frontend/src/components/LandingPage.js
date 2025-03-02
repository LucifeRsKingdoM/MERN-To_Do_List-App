// src/components/LandingPage.js
import React, { useState } from "react";
import { Container, Box, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import Header from "./Header";
import AuthForm from "./AuthForm";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * Renders the Landing Page:
 * - Header at the top
 * - Short description + AuthForm on the left
 * - Large image on the right
 * - A dialog for "Guest Mode" name input
 */
const LandingPage = ({ setUser, refreshPage }) => {
  // Dialog state for guest mode
  const [guestDialogOpen, setGuestDialogOpen] = useState(false);
  const [guestName, setGuestName] = useState("");

  // Function to open the guest dialog from AuthForm
  const openGuestDialog = () => {
    setGuestDialogOpen(true);
  };

  // Handle Guest Mode login
  const handleGuestLogin = () => {
    if (!guestName.trim()) {
      toast.success("Please enter your name");
      return;
    }
    // Create a "fake" token with guest information
    const guestUser = {
      id: `guest-${Date.now()}`,
      username: guestName,
      email: `guest-${Date.now()}@guest.com`,
      isGuest: true,
    };

    const guestToken = `guest-token-${Date.now()}`;
    localStorage.setItem("token", guestToken);
    localStorage.setItem("guestUser", JSON.stringify(guestUser));
    localStorage.setItem("guestTodos", JSON.stringify([]));

    setGuestDialogOpen(false);

    // Slight delay to ensure the dialog closes before showing success
    setTimeout(() => {
        toast.success(`Welcome, ${guestName}! You're in guest mode.`);
      setUser(guestUser);
      if (refreshPage) refreshPage();
    }, 100);
  };

  return (
    <Container
        maxWidth="lg"
        sx={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            padding: 0,
            margin: 0,
        }}
    >
      {/* 1) Header at the top */}
      <Header />

      {/* 2) Main content area */}
    <Box
        sx={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: "40px", // space under header
        padding: "0 20px", // optional side padding
        }}
    >
      
        {/* LEFT SIDE: Form + Description */}
        <Box sx={{ width: "45%", display: "flex", flexDirection: "column", gap: 2 }}>
          {/* Two lines describing the app */}
          <Typography variant="h4" gutterBottom>
            Welcome to Our Todo App
          </Typography>
          <Typography variant="subtitle1" paragraph>
            Organize your tasks efficiently. Track deadlines, prioritize work, 
            and never miss a thing!
          </Typography>

          {/* Left SIDE: Large image */}
          <Box sx={{ width: "80%", display: "flex", justifyContent: "center", marginRight: "20%" }}>
        <img
            src="/pic.png"
            alt="To-Do List"
            style={{
            width: "100%",
            maxWidth: "500px",
            borderRadius: "15px",
            }}
        />
        </Box>
        </Box>

        
        {/* AuthForm (login/register) */}
        <AuthForm
            setUser={setUser}
            refreshPage={refreshPage}
            openGuestDialog={openGuestDialog}
          />
      </Box>

      {/* Guest Mode Dialog */}
      <Dialog open={guestDialogOpen} onClose={() => setGuestDialogOpen(false)}>
        <DialogTitle>Guest Mode</DialogTitle>
        <DialogContent>
          <Typography paragraph>Enter your name to continue without registration:</Typography>
          <TextField
            autoFocus
            margin="dense"
            label="Your Name"
            type="text"
            fullWidth
            variant="outlined"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setGuestDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleGuestLogin} color="primary" variant="contained">
            Continue
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer position="top-right" autoClose={2000} />
    </Container>
  );
};

export default LandingPage;
