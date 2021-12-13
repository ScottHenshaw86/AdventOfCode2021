// Advent Of Code 2021 - Day #: Part 1
const fs = require("fs");

// import my puzzle input and format it into an array of numbers
const input = fs.readFileSync("./sample.txt", "latin1").split(/\n/g);

const dots = input.filter((a) => parseInt(a) > -1).map((b) => b.split(","));
const folds = input.filter((a) => a.includes("fold"));
const fold1 = folds[0];

const paper = [];

let maxX = 10;
let maxY = 14;

for (let y = 0; y < maxY + 1; y++) {
  paper.push([]);
  for (let x = 0; x < maxX + 1; x++) {
    paper[y].push(".");
  }
}

for (let i = 0; i < dots.length; i++) {
  const x = parseInt(dots[i][0]);
  const y = parseInt(dots[i][1]);
  paper[y][x] = "#";
}

const foldY = () => {
  let newY = 0;
  for (let y = paper.length - 1; y > 7; y--) {
    for (let x = 0; x < paper[0].length; x++) {
      if (paper[y][x] === "#") {
        paper[newY][x] = "#";
      }
    }
    newY++;
  }
};

const foldX = () => {
  for (let y = 0; y < paper.length; y++) {
    let newX = 0;
    for (let x = paper[0].length - 1; x > 0; x--) {
      if (paper[y][x] === "#") {
        paper[y][newX] = "#";
      }
      newX++;
    }
  }
};

foldX();

paper.splice(7);

console.log(paper);
