// Advent Of Code 2021 - Day 1: Part 2
const fs = require("fs");

// import my puzzle input and format it into an array of numbers
const input = fs
  .readFileSync("./input.txt", "latin1")
  .split(/[(\r\n)(,)]/g)
  .map(Number);

let count = 0;
let a = input[0];
let b = input[1];
let c = input[2];

input.forEach((n, i) => {
  if (n + b + c > a + b + c) count++;
  a = b;
  b = c;
  c = n;
});

console.log(count);
