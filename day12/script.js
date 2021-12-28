// Advent Of Code 2021 - Day 12: Part 1
const fs = require("fs");

// import my puzzle input and format it into an array of arrays of strings
const input = fs
  .readFileSync("./input.txt", "latin1")
  .split(/\r\n/g)
  .map(a => a.split("-"));

let count = 0;

const findNext = (current, paths) => {
  for (let i=0; i< input.length; i++) {
    const newPaths = [...paths];
    let a = input[i][0];
    let b = input[i][1];
    if (a === a.toLowerCase() && paths.includes(a)) continue;
    if (b === b.toLowerCase() && paths.includes(b)) continue;
    if (a === current) {
      if (b === 'end') {
        count++;
        newPaths.push('end')
        // console.log(newPaths)
        continue;
      }
      newPaths.push(current);
      findNext(b, newPaths);
    }
    if (b === current) {
      if (a === 'end') {
        count++;
        newPaths.push('end')
        // console.log(newPaths)
        continue;
      }
      newPaths.push(current);
      findNext(a, newPaths);
    }
  }
}

findNext('start', []);

console.log(count)