// Advent Of Code 2020 - Day 1: Part 1
// find the two entries that sum to 2020
// and then multiply those two numbers together.

const fs = require("fs");

// import my puzzle input and format it into an array of numbers
// there's probably a more elegant way to do this.
var text = fs
  .readFileSync("./input.txt")
  .toString()
  .split(/[(\r\n)(,)]/g)
  .map(Number);

const findPair = (input, sum) => {
  const numSet = new Set(input);
  for (let i = 0; i < input.length; i++) {
    if (numSet.has(sum - input[i])) return [input[i], sum - input[i]];
  }
};

const getProduct = (arr) => {
  return arr.reduce((a, b) => a * b);
};

console.log(getProduct(findPair(text, 2020)));
