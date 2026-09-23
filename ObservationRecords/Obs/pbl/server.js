const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Built-in middleware for JSON parsing and URL encoding
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request Logger Middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} request to ${req.url}`);
  next();
});

// Mock database: At least 5 student records
const students = [
  { id: 1, rollNo: "CS101", name: "Aarav Sharma", branch: "CSE", year: 2 },
  { id: 2, rollNo: "AI102", name: "Bhavna Patel", branch: "AIML", year: 2 },
  { id: 3, rollNo: "CS103", name: "Chirag Reddy", branch: "CSE", year: 3 },
  { id: 4, rollNo: "IT104", name: "Divya Verma", branch: "IT", year: 1 },
  { id: 5, rollNo: "AI105", name: "Eshan Gupta", branch: "AIML", year: 2 },
  { id: 6, rollNo: "EC106", name: "Farhan Khan", branch: "ECE", year: 4 }
];

// Route 1: Home
app.get('/', (req, res) => {
  res.status(200).json({
    message: "Welcome to the Student Information Portal API",
    status: "Active",
    availableRoutes: [
      { path: "/", method: "GET", description: "API root and system status" },
      { path: "/students", method: "GET", description: "Retrieve list of all students" },
      { path: "/about", method: "GET", description: "Application details and metadata" }
    ]
  });
});

// Route 2: Students List
app.get('/students', (req, res) => {
  res.status(200).json({
    success: true,
    count: students.length,
    data: students
  });
});

// Route 3: About Application
app.get('/about', (req, res) => {
  res.status(200).json({
    application: "Student Directory Server",
    version: "1.0.0",
    framework: "Express.js",
    environment: "Node.js",
    description: "A lightweight web service designed to manage and expose student records via RESTful endpoints.",
    author: "Student"
  });
});

// 404 Handler for undefined routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Route not found"
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});