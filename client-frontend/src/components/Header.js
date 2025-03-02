// src/components/Header.js
import React from "react";
import { Typography } from "@mui/material";

const Header = () => (
  <header
    style={{
      display: "flex",
      alignItems: "center",
      padding: "10px 20px",
      borderBottom: "2px solid #ddd",
      background: "#fff",
      position: "sticky",
      top: 0,
      zIndex: 1000,
    }}
  >
    <img
      src="/pic.png"
      alt="Logo"
      style={{ width: "50px", marginRight: "10px" }}
    />
    <Typography variant="h5" style={{ fontWeight: "bold" }}>
      Todo App
    </Typography>
  </header>
);

export default Header;
