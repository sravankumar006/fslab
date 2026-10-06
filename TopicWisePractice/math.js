// mathUtils.js - User defined module
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function calculatePercentage(obtained, total) {
  return ((obtained / total) * 100).toFixed(2);
}

module.exports = { add, subtract, calculatePercentage };