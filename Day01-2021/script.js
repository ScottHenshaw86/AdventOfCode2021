// Advent Of Code 2021 - Day 1: Part 1

const fs = require("fs");

// import my puzzle input and format it into an array of numbers
// there's probably a more elegant way to do this.
var text = fs
  .readFileSync("./input.txt")
  .toString()
  .split(/[(\r\n)(,)]/g)
  .map(Number);

let count = 0;
let prev = text[0];

for (let i = 1; i < text.length; i++) {
  if (text[i] > prev) {
    count++;
  }
  prev = text[i];
}

console.log(count);
