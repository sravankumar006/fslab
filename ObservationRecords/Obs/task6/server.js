/**
 * Question 8: Express.js Middleware & Request-Response Pipeline
 */

const express = require('express');
const app = express();
const PORT = 3000;

// 1. Custom Logging Middleware Function
const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl;
  const ip = req.ip || req.socket.remoteAddress;

  console.log(`[${timestamp}] [INCOMING] ${method} -> ${url} | Client IP: ${ip}`);

  // Crucial: Pass control to next handler in the stack
  next();
};

// 2. Register Middleware Globally
app.use(requestLogger);

// 3. Define Application Endpoints
app.get('/', (req, res) => {
  res.status(200).send("<h1>Home Page</h1><p>Middleware successfully intercepted and passed this request.</p>");
});

app.get('/api/status', (req, res) => {
  res.status(200).json({
    status: "Active",
    uptime: process.uptime(),
    timestamp: new Date()
  });
});

// 4. Start Server
app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
  console.log(`Press Ctrl+C to terminate.`);
});