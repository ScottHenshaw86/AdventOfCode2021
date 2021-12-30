// Advent Of Code 2021 - Day 19: Part 1
const fs = require("fs");

// import my puzzle input and format it into an array of numbers
const input = fs
  .readFileSync("./input.txt", "latin1")
  .split(/--- scanner [0-9] ---\r\n/g).map(a => a.split("\r\n")).map(b => b.filter(d => d !== "")).map(c => c.map(d => d.split(",")))

input.shift();

console.log(input);
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

let overlaps = 0;

for (let i=0; i<input.length; i++) { // loop through input arrays
  for (let j=0; j<input[i].length; j++) { // loop through scanner array
    overlaps++;
    for (let k=0; k<input[i][j].length; k++) { // loop through scanner array
      console.log(input[i][j][k])
    }
  }
}

console.log(overlaps)


// 585 too high
// 465 too high
// 429 too high
// 417 X
// 405 X
// 393 X
// 381 X
// 369 
// 357
