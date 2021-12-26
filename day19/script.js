// Advent Of Code 2021 - Day 19: Part 1
const fs = require("fs");

// import my puzzle input and format it into an array of numbers
const input = fs
  .readFileSync("./sample.txt", "latin1")
  .split(/--- scanner [0-9] ---\r\n/g)
  .map((a) =>
    a
      .split("\n")
      .filter((b) => b.length > 0)
      .map((c) => c.split(",").map(d => parseInt(d) + 1000))
  );
input.shift();

// console.log(input);
// [
//   [ i
//     [404, -588, -901], j[0][0], j[0][1], j[0][2]
//     [528, -643, 409],
//   ],
//   [
//     [686, 422, 578],
//     [605, 423, 415],
//   ],
// ];

const grid = [];

const c = input.length;
for (let i = 0; i < c; i++) {
  for (let j = 0; j < input[i].length; j++) {
    if (!input[i][j][0]) break;
    console.log(Math.round(input[i][j][0] / 20))
  }
}
