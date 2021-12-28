// Advent Of Code 2021 - Day 12: Part 2
const fs = require("fs");

const input = fs
  .readFileSync("./input.txt", "latin1")
  .split(/\n/g)
  .map((a) => a.split("-"));

let count = 0;
const findNext = (current, paths) => {
  if (current === "start" && paths.includes(current)) return;
  if (current === current.toLowerCase() && paths.includes(current)) {
    const check = paths.filter((x) => x === x.toLowerCase());
    const checkSet = new Set(check);
    if (check.length > checkSet.size) {
      return;
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
