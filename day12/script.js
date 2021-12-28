// Advent Of Code 2021 - Day 12: Part 1
const fs = require("fs");

// import my puzzle input and format it into an array of arrays of strings
const input = fs
  .readFileSync("./sample.txt", "latin1")
  .split(/\n/g)
  .map((a) => a.split("-"));

// console.log(input);
// [
//   [ 'start', 'A' ],
//   [ 'start', 'b' ],
//   [ 'A', 'c' ],
//   [ 'A', 'b' ],
//   [ 'b', 'd' ],
//   [ 'A', 'end' ],
//   [ 'b', 'end' ]
// ]

// track the number of paths found
let count = 0;

// recursive function to check paths that connect to the current room
// accepts the current room and an array of visited rooms
const findNext = (current, paths) => {
  for (let i = 0; i < input.length; i++) {
    // loop through the list of connected rooms
    const newPaths = [...paths]; // copy the visited rooms array
    let a = input[i][0];
    let b = input[i][1];

    // check if a room is lowercase.
    // if it is lowercase and I've already visited it, I can't visit it again
    if (a === a.toLowerCase() && paths.includes(a)) continue;
    if (b === b.toLowerCase() && paths.includes(b)) continue;

    // if the 1st element is the room I'm currently in...
    if (a === current) {
      if (b === "end") {
        // if my current room connected to "end", this path is complete
        count++; // so increment my counter
        newPaths.push("end");
        continue;
      }
      newPaths.push(current); // if the next room is not "end", I will add it to my array of visited rooms
      findNext(b, newPaths); // then call my function again to check rooms connected to this new room
    }

    // Lines 40-48 are same as above, but if the 2nd element is the room I'm currently in
    if (b === current) {
      if (a === "end") {
        count++;
        newPaths.push("end");
        continue;
      }
      newPaths.push(current);
      findNext(a, newPaths);
    }
    // console.log(newPaths);
  }
};

findNext("start", []);

console.log(count);
