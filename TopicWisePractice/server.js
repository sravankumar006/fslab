// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const dns = require('dns');
const mathUtils = require('./mathUtils');

const app = express();
const PORT = 3000;

// Middleware to parse JSON and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom Logging Middleware
app.use((req, res, next) => {
  const logEntry = `[${new Date().toISOString()}] ${req.method} ${req.url}\n`;
  console.log(logEntry.trim());
  
  // Async log write using fs module
  fs.appendFile(path.join(__dirname, 'server.log'), logEntry, (err) => {
    if (err) console.error("Log error:", err);
  });
  
  next();
});

// Built-in DNS module route example
app.get('/api/dns-lookup', (req, res) => {
  dns.lookup('google.com', (err, address, family) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ host: 'google.com', ip: address, family: `IPv${family}` });
  });
});

// Route using user-defined module
app.get('/api/calculate', (req, res) => {
  const marks = parseFloat(req.query.marks) || 85;
  const total = parseFloat(req.query.total) || 100;
  const percentage = mathUtils.calculatePercentage(marks, total);
  res.json({ marks, total, percentage: `${percentage}%` });
});

// Handling Form Data via POST
app.post('/api/submit-feedback', (req, res) => {
  const { username, message } = req.body;
  if (!username || !message) {
    return res.status(400).send("Bad Request: Missing username or message.");
  }
  res.status(201).json({ status: "Success", received: { username, message } });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});