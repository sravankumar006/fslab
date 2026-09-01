const os = require('os');
const path = require('path');
const dns = require('dns');
const net = require('net');

// ==========================================
// 1. OS MODULE: System Information
// ==========================================
console.log('--- 1. OS MODULE ---');
console.log(`OS Platform: ${os.platform()}`);
console.log(`CPU Architecture: ${os.arch()}`);
console.log(`Total Memory: ${os.totalmem()} bytes`);
console.log(`Free Memory: ${os.freemem()} bytes`);
console.log('Current User Info:', os.userInfo());
console.log();

// ==========================================
// 2. PATH MODULE: Working with File Paths
// ==========================================
console.log('--- 2. PATH MODULE ---');
const filePath = '/users/john/documents/report.txt';

console.log(`Directory Name: ${path.dirname(filePath)}`);
console.log(`File Name: ${path.basename(filePath)}`);
console.log(`File Extension: ${path.extname(filePath)}`);

const newPath = path.join(__dirname, 'data', 'config.json');
console.log(`Joined Path: ${newPath}`);
console.log();

// ==========================================
// 3. DNS MODULE: Resolving Domains & IPs
// ==========================================
console.log('--- 3. DNS MODULE ---');
dns.lookup('google.com', (err, address, family) => {
  if (err) return console.error('DNS Lookup Error:', err.message);
  console.log(`IP Address for google.com: ${address}`);
  console.log(`IP Family: IPv${family}`);
});

dns.resolve4('google.com', (err, addresses) => {
  if (err) return console.error('DNS Resolve Error:', err.message);
  console.log('All IPv4 addresses for google.com:', addresses);
  console.log();
});

// ==========================================
// 4. NET MODULE: TCP Server & Client
// ==========================================
const PORT = 3000;

// Create TCP Server
const server = net.createServer((socket) => {
  console.log('TCP Server: Client connected.');
  socket.write('Hello from the server!');

  socket.on('data', (data) => {
    console.log(`TCP Server Received: ${data.toString()}`);
  });

  socket.on('end', () => {
    console.log('TCP Server: Client disconnected.');
  });
});

server.listen(PORT, () => {
  console.log(`--- 4. NET MODULE ---`);
  console.log(`TCP Server listening on port ${PORT}`);

  // Create a local TCP Client to connect to the server above
  const client = net.createConnection({ port: PORT }, () => {
    console.log('TCP Client: Connected to server!');
    client.write('Hello from the client!');
  });

  client.on('data', (data) => {
    console.log(`TCP Client Received: ${data.toString()}`);
    // Close client connection and server after test run
    client.end();
  });

  client.on('end', () => {
    console.log('TCP Client: Disconnected.');
    server.close();
  });
});

// ==========================================
// 5. MODERN ERROR HANDLING (Replaces Domain)
// ==========================================
process.on('uncaughtException', (err) => {
  console.error('Global Uncaught Exception:', err.message);
});

process.on('unhandledRejection', (reason) => {
  console.error('Global Unhandled Rejection:', reason);
});