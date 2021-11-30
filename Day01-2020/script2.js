// Advent Of Code 2020 - Day 1: Part 2
// find the *three* entries that sum to 2020
// and then multiply those three numbers together.

const fs = require("fs");

// import my puzzle input and format it into an array of numbers
// there's probably a more elegant way to do this.
var text = fs
  .readFileSync("./input.txt")
  .toString()
  .split(/[(\r\n)(,)]/g)
  .map(Number);

const findTriplet = (input, sum) => {
  const numSet = new Set(input);
  for (let i = 0; i < input.length; i++) {
    for (let j = 1; j < input.length - 1; j++) {
      if (numSet.has(sum - input[i] - input[j])) {
        return [input[i], input[j], sum - input[i] - input[j]];
      }
    }
  }
};

const getProduct = (arr) => {
  return arr.reduce((a, b) => a * b);
};

console.log(getProduct(findTriplet(text, 2020)));
