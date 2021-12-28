// Advent Of Code 2021 - Day 12: Part 2
const fs = require("fs");

// import my puzzle input and format it into an array of arrays of strings
const input = fs
  .readFileSync("./input.txt", "latin1")
  .split(/\n/g)
  .map((a) => a.split("-"));

let count = 0;

const findNext = (current, paths) => {
  if (current === "start" && paths.includes(current)) return; // don't go back to start
  if (current === current.toLowerCase() && paths.includes(current)) {
    // if lowercase and already in paths, need to make sure it doesn't get visited more than twice
    const check = paths.filter((x) => x === x.toLowerCase()); // check only the lowercase rooms that have been visited
    const checkSet = new Set(check); // get rid of duplicates
    if (check.length > checkSet.size) {
      return; // if a lowercase room has already been visited twice, this path fails
    }
  }

  for (let i = 0; i < input.length; i++) {
    const newPaths = [...paths];
    let a = input[i][0];
    let b = input[i][1];
    if (a === current) {
      if (b === "end") {
        count++;
        newPaths.push("end");
        continue;
      }
      newPaths.push(current);
      findNext(b, newPaths);
    }
    if (b === current) {
      if (a === "end") {
        count++;
        newPaths.push("end");
        continue;
      }
      newPaths.push(current);
      findNext(a, newPaths);
    }
  }
};

findNext("start", []);

console.log(count);
