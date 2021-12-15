// Advent Of Code 2021 - Day 14: Part 2
const fs = require("fs");
const { setgroups } = require("process");

// import my puzzle input and format it into an array of numbers
const input = fs.readFileSync("./input.txt", "latin1").split(/[(\r\n)(,)]/g);

const template = input.shift();
input.shift();
const rulesArr = input.map((a) => a.split(" -> "));

const rules = Object.fromEntries(rulesArr);

let polymer = Object.fromEntries(rulesArr);
for (const a in polymer) {
  polymer[a] = 0;
}

for (let i = 0; i < template.length - 1; i++) {
  const pair = `${template[i]}${template[i + 1]}`;
  polymer[pair] = polymer[pair] + 1;
}

const STEPS = 40;

for (let i = 0; i < STEPS; i++) {
  let newPolymer = JSON.parse(JSON.stringify(polymer));
  for (pair in polymer) {
    if (polymer[pair] > 0) {
      const newPair1 = `${pair[0]}${rules[pair]}`;
      const newPair2 = `${rules[pair]}${pair[1]}`;
      newPolymer[newPair1] = newPolymer[newPair1] + polymer[pair];
      newPolymer[newPair2] = newPolymer[newPair2] + polymer[pair];
      newPolymer[pair] = newPolymer[pair] - polymer[pair];
    }
  }
  // console.log(newPolymer);
  polymer = JSON.parse(JSON.stringify(newPolymer));
}

// console.log(polymer);

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const totals = {
  A: 0,
  B: 0,
  C: 0,
  D: 0,
  E: 0,
  F: 0,
  G: 0,
  H: 0,
  I: 0,
  J: 0,
  K: 0,
  L: 0,
  M: 0,
  N: 0,
  O: 0,
  P: 0,
  Q: 0,
  R: 0,
  S: 0,
  T: 0,
  U: 0,
  V: 0,
  W: 0,
  X: 0,
  Y: 0,
  Z: 0,
};

for (let i = 0; i < letters.length; i++) {
  for (pair in polymer) {
    if (pair[0] === letters[i]) {
      totals[letters[i]] = totals[letters[i]] + polymer[pair];
    }
    if (pair[1] === letters[i]) {
      totals[letters[i]] = totals[letters[i]] + polymer[pair];
    }
  }
  // console.log(`${letters[i]}: ${totals[letters[i]]}`);
  if (
    letters[i] === template[0] ||
    letters[i] === template[template.length - 1]
  ) {
    totals[letters[i]] = (totals[letters[i]] + 1) / 2;
  } else {
    totals[letters[i]] = totals[letters[i]] / 2;
  }
}

// console.log(totals);

const values = Object.values(totals).filter((value) => value > 0);

const min = Math.min(...values);
const max = Math.max(...values);

console.log("ANSWER");
console.log(max - min);
