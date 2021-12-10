// Advent Of Code 2021 - Day 6: Part 1
const fs = require("fs");

// import my puzzle input and format it into an array of numbers
const input = fs
  .readFileSync("./input.txt", "latin1")
  .split(",")
  .map(Number);

for (let i=0; i< 80; i++) {
  let c = input.length;
  for (let j=0; j<c; j++) {
    if (input[j] > 0) {
      input[j] = input[j] - 1
    } else {
      input[j] = 6;
      input.push(8);
    }
  }
}

console.log(input)
console.log(`ANSWER: ${input.length}`)