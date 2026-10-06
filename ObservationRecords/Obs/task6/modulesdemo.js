/**
 * Question 6: Node.js Built-in Modules (os, path, fs)
 */

const os = require('os');
const path = require('path');
const fs = require('fs');

console.log("=== 1. OS MODULE METRICS ===");
console.log(`Platform: ${os.platform()}`);
console.log(`Architecture: ${os.arch()}`);
console.log(`Free Memory: ${(os.freemem() / (1024 * 1024)).toFixed(2)} MB`);
console.log(`Total Memory: ${(os.totalmem() / (1024 * 1024)).toFixed(2)} MB`);
console.log(`Home Directory: ${os.homedir()}`);

console.log("\n=== 2. PATH MODULE UTILITIES ===");
const samplePath = path.join(__dirname, 'data', 'reports', 'output.txt');
console.log(`Resolved Path: ${samplePath}`);
console.log(`Base Name: ${path.basename(samplePath)}`);
console.log(`Extension: ${path.extname(samplePath)}`);
console.log(`Parent Directory: ${path.dirname(samplePath)}`);

console.log("\n=== 3. FS MODULE FILE OPERATIONS ===");
const targetFile = path.join(__dirname, 'demo.txt');
const initialContent = "Operating System: Node.js Runtime\nStatus: Execution Successful!";

// Step A: Asynchronously write data
fs.writeFile(targetFile, initialContent, 'utf8', (err) => {
  if (err) {
    console.error("Error writing to file:", err);
    return;
  }
  console.log("-> File 'demo.txt' created successfully.");

  // Step B: Asynchronously read and verify data
  fs.readFile(targetFile, 'utf8', (readErr, data) => {
    if (readErr) {
      console.error("Error reading file:", readErr);
      return;
    }
    console.log("-> Read Content from 'demo.txt':\n" + data);
  });
});