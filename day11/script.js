// Advent Of Code 2021 - Day 11: Part 1
const fs = require("fs");

// import my puzzle input and format it into an array of numbers
const input = fs
  .readFileSync("./input.txt", "latin1")
  .split(/\n/g)
  .map((a) => {
    return a.split("").map((d) => parseInt(d));
  }); // maybe not necessary

// remove junk (\r) at end of lines
for (let i = 0; i < input.length; i++) {
  if (input[i].length > input[input.length - 1].length) {
    input[i].pop();
  }
}

let count = 0;

const checkNeighbors = (i, j) => {
  let flashes = false;
  if (!input[i]?.[j]) return;
  input[i][j] = 0;
  count++;
  const neighbors = [
    { i: i - 1, j: j - 1 },
    { i: i - 1, j: j },
    { i: i - 1, j: j + 1 },
    { i: i, j: j - 1 },
    { i: i, j: j + 1 },
    { i: i + 1, j: j - 1 },
    { i: i + 1, j: j },
    { i: i + 1, j: j + 1 },
  ]
  for (let i = 0; i < neighbors.length; i++) {
    const a = neighbors[i];
    if (!input[a.i]?.[a.j]) continue;
    let octopus = input[a.i][a.j]
    if (octopus === 0) continue;
    if (octopus > 8) {
      flashes = true;
      checkNeighbors(a.i, a.j);
    } else {
      input[a.i][a.j]++;
    }
  }
  return flashes;
}

const c = input[0].length;
for (let step = 0; step < 100; step++) {
  for (let i = 0; i < c; i++) {
    for (let j = 0; j < c; j++) {
      input[i][j] = input[i][j] + 1;
    }
  }

  for (let i = 0; i < c; i++) {
    for (let j = 0; j < c; j++) {
      if (input[i][j] > 9) {
        ongoing = checkNeighbors(i, j);
        console.log(ongoing);
      }
    }
  }
}

console.log(count)