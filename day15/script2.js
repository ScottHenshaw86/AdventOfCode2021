// Advent Of Code 2021 - Day 15: Part 2
const fs = require("fs");

// import my puzzle input and format it into an array of numbers
const input0 = fs
  .readFileSync("./sample.txt", "latin1")
  .split(/\n/g)
  .map((a) => a.split("")) // maybe not necessary
  .map((a) => a.map(Number));

// console.log(input);
//    j -->
// i
// |
// v

const input1 = [];
const input2 = [];
const input3 = [];
const input4 = [];
const input5 = [];
const input6 = [];
const input7 = [];
const input8 = [];

for (let i = 0; i < 8; i++) {
  // do something
}

// let total = 9999999999;

// const c = input.length;
// const d = input[0].length;

// const bestPathRisk = [];

// const checkNeighbors = (i, j, count) => {
//   if (!bestPathRisk[i]) bestPathRisk[i] = [];
//   if (!bestPathRisk[i][j]) {
//     bestPathRisk[i][j] = 9999;
//   }
//   if (count < bestPathRisk[i][j]) {
//     bestPathRisk[i][j] = count;
//     // console.log("BEST");
//   } else return;
//   if (i === c - 1 && j === d - 1) {
//     if (count < total) {
//       total = count;
//       console.log(total);
//     }
//     return;
//   }
//   if (input[i][j + 1] > 0) {
//     checkNeighbors(i, j + 1, count + input[i][j + 1]);
//   }
//   if (input[i + 1]?.[j] > 0) {
//     checkNeighbors(i + 1, j, count + input[i + 1][j]);
//   }
//   if (input[i - 1]?.[j] > 0) {
//     checkNeighbors(i - 1, j, count + input[i - 1][j]);
//   }
//   if (input[i][j - 1] > 0) {
//     checkNeighbors(i, j - 1, count + input[i][j - 1]);
//   }
// };

// checkNeighbors(0, 0, 0);

// console.log(bestPathRisk);
