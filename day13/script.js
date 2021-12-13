// Advent Of Code 2021 - Day #: Part 1
const fs = require("fs");

// import my puzzle input and format it into an array of numbers
const input = fs.readFileSync("./sample.txt", "latin1").split(/\n/g);

const dots = input.filter((a) => parseInt(a) > -1).map((b) => b.split(","));
const folds = input.filter((a) => a.includes("fold"));
const fold1 = folds[0];

console.log(dots);

const paper = [];

for (let i = 0; i < dots.length; i++) {
  const x = parseInt(dots[i][0]);
  const y = parseInt(dots[i][1]);
  if (!paper[y]) paper[y] = [];
  paper[y][x] = "#";
}

let newY = 0;
for (let y = paper.length - 1; y > 7; y--) {
  for (let x = 0; x < paper[0].length; x++) {
    if (paper[y]?.[x] === "#") {
      if (!paper[newY]) paper[newY] = [];
      paper[newY][x] === "#";
    }
  }
  newY++;
}

paper.splice(0, 7);

console.log(paper);
