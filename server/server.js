require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const mongoose = require("mongoose");
const socketio = require("socket.io");
const db = require("./config/db");
const socketConfig = require("./socket");

const app = express();
const server = http.createServer(app);

// Connect to MongoDB
db.connect();

// Middleware
app.use(cors());
app.use(express.json());

// Socket.io setup
const io = socketio(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// Initialize socket
socketConfig(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
