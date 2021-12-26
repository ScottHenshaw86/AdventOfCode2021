// Advent Of Code 2021 - Day #: Part 1
const fs = require("fs");

// import my puzzle input and format it into an array of numbers
const input = fs
  .readFileSync("./input.txt", "latin1")
  .split(/\r\n/g).map(a => a.split(" "))

// console.log(input);

const max = 99999999999999; // largest possible 14 digit number
const min = 11111111111111; // smallest possible 14 digit number with no 0s

const c = input.length;
for (let i = max; i >= max-30000000; i--) {
  let digit = 0;
  const string = i.toString();
  console.log(i)
  if (string.includes('0')) continue;
  for (let j = 0; j < c; j++) {
    const operation = input[j][0];
    const a = input[j][1];
    const b = input[j][2];

    let w = 0;
    let x = 0;
    let y = 0;
    let z = 0;

    if (operation === "inp") {
      w = string[digit];
      // console.log(w)
      digit++;
    }
  }
}