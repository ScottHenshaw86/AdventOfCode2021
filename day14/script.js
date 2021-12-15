// Advent Of Code 2021 - Day 14: Part 1
const fs = require("fs");
const { setgroups } = require("process");

// import my puzzle input and format it into an array of numbers
const input = fs.readFileSync("./input.txt", "latin1").split(/[(\r\n)(,)]/g);

const template = input.shift();
input.shift();
const rulesArr = input.map((a) => a.split(" -> "));

// const template = NNCB

// const rulesArr = [
//   [ 'CH', 'B' ], [ 'HH', 'N' ],
//   [ 'CB', 'H' ], [ 'NH', 'C' ],
//   [ 'HB', 'C' ], [ 'HC', 'B' ],
//   [ 'HN', 'C' ], [ 'NN', 'C' ],
//   [ 'BH', 'H' ], [ 'NC', 'B' ],
//   [ 'NB', 'B' ], [ 'BN', 'B' ],
//   [ 'BB', 'N' ], [ 'BC', 'B' ],
//   [ 'CC', 'N' ], [ 'CN', 'C' ]
// ]

const rules = Object.fromEntries(rulesArr);

// console.log(rules);

const STEPS = 10; // 10 for Part 1;

let polymer = template;
for (let i = 0; i < STEPS; i++) {
  console.log(i);
  console.log(polymer.length);
  for (let i = 0; i < polymer.length; i++) {
    if (rules[`${polymer[i]}${polymer[i + 1]}`]) {
      polymer =
        polymer.slice(0, i + 1) +
        rules[`${polymer[i]}${polymer[i + 1]}`] +
        polymer.slice(i + 1);
      i++;
    }
  }
  // console.log(polymer);
}

const letters = Object.values(rules);

let min = 999999;
let max = 0;

const c = letters.length;
for (let i = 0; i < c; i++) {
  const letterRegex = new RegExp(letters[i], "g");
  const count = (polymer.match(letterRegex) || []).length;
  if (count > 0 && count < min) {
    min = count;
  }
  if (count > max) {
    max = count;
  }
}

console.log(max - min);
