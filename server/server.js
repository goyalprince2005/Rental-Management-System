// Import required packages
const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Create Express application
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Port configuration
const PORT = process.env.PORT || 5000;

// Basic health-check route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Rental Management System Backend is running!",
    });
});

// Health-check API
app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        status: "Server is healthy",
        timestamp: new Date(),
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🌐 URL: http://localhost:${PORT}`);
});