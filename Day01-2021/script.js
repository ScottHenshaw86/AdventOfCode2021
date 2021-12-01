// Advent Of Code 2021 - Day 1: Part 1
const fs = require("fs");

// import my puzzle input and format it into an array of numbers
const input = fs
  .readFileSync("./input.txt", "latin1")
  .split(/[(\r\n)(,)]/g)
  .map(Number);

let count = 0;
let prev = input[0];

input.forEach((n) => {
  if (n > prev) count++;
  prev = n;
});

console.log(count);
