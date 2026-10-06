/**
 * Question 7: NPM and External Packages
 * Utilizing lodash for collection manipulation.
 */

const _ = require('lodash');

const rawScores = [45, 88, 12, 95, 88, 70, 45, 99, 100, 12];

console.log("Original Scores:", rawScores);

// Chain multiple utility methods
const uniqueSortedScores = _.chain(rawScores)
  .uniq()          // Remove duplicates
  .sortBy()        // Sort ascending
  .reverse()       // Sort descending
  .value();

console.log("Unique Sorted (Top to Bottom):", uniqueSortedScores);
console.log("Chunked in Pairs:", _.chunk(uniqueSortedScores, 2));