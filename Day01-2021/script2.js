// Advent Of Code 2021 - Day 1: Part 2

const fs = require("fs");

// import my puzzle input and format it into an array of numbers
// there's probably a more elegant way to do this.
var text = fs
  .readFileSync("./input.txt")
  .toString()
  .split(/[(\r\n)(,)]/g)
  .map(Number);

let count = 0;
let a = text[0];
let b = text[1];
let c = text[2];

for (let i = 3; i < text.length; i++) {
  if (text[i] + b + c > a + b + c) {
    count++;
  }
  a = text[i - 2];
  b = text[i - 1];
  c = text[i];
}

console.log(count);
