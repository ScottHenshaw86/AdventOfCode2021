// Advent Of Code 2021 - Day 19: Part 1
const fs = require("fs");

// import my puzzle input and format it into an array of numbers
const input = fs
  .readFileSync("./sample.txt", "latin1")
  .split(/--- scanner [0-9] ---\n/g)
  .map((a) =>
    a
      .split("\n")
      .filter((b) => b.length > 0)
      .map((c) => c.split(",").map(Number))
  );
input.shift();

// console.log(input);
// [
//   [
//     [404, -588, -901],
//     [528, -643, 409],
//   ],
//   [
//     [686, 422, 578],
//     [605, 423, 415],
//   ],
// ];

const diffs = [];

const c = input.length;
const d = input[0].length;
for (let i = 0; i < c; i++) {
  for (let j = 0; j < d; j++) {
    console.log(input[i][j]);
    if (diffs)
  }
}
