// Advent Of Code 2021 - Day 9: Part 1
const fs = require("fs");

// import my puzzle input and format it into an array of numbers
const input = fs
  .readFileSync("./input.txt", "latin1")
  .split(/\r\n/g)
  // .map(Number); // maybe not necessary

const c = input.length;
const d = input[0].length;

let count = 0;

// loop through the outer elements
for (let i=0; i<c; i++) {
  // loop through the numbers in each string
  for (let j=0; j<d; j++) {
    const num = parseInt(input[i][j]);
    const up = parseInt(input[i-1]?.[j]);
    const down = parseInt(input[i+1]?.[j]);
    const left = parseInt(input[i][j-1]);
    const right = parseInt(input[i][j+1]);
    if (num >= up) continue;
    if (num >= down) continue;
    if (num >= left) continue;
    if (num >= right) continue;
    count += num + 1;
  }
}

console.log(count);