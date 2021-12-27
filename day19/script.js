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
      .map((c) =>
        c.split(",").map((d) => Math.round((parseInt(d) + 1000) / 40))
      )
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
for (let i = 1; i < 2; i++) {
  let grid = [];

  for (let j = 0; j < 50; j++) {
    grid.push(Array(50).fill("."));
  }
  for (let j = 0; j < input[0].length; j++) {
    let x = input[i][j][0];
    let y = input[i][j][1];
    // console.log(typeof x);
    // console.log(`x: ${x} y: ${y}`);
    grid[x][y] = "B";
    // console.log(grid[x][y]);
    // console.log(grid);
  }
  grid = grid.map((a) => a.join(""));
  console.log(grid);
}
