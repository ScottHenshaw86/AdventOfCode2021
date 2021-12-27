// Advent Of Code 2021 - Day #: Part 1
const fs = require("fs");

// import my puzzle input and format it into an array of numbers
const input = fs
  .readFileSync("./input.txt", "latin1")
  .split(/\r\n/g).map(a => a.split(" "))

// console.log(input);

// console.log(input)

const max = 99989999999999; // largest possible 14 digit number
const min = 11111111111111; // smallest possible 14 digit number with no 0s

let count = 0;

const start = performance.now();
const c = input.length;
for (let i = max; i >= max - 1; i--) {
  let digit = 0;
  const string = i.toString();
  // console.log(i)
  if (string.includes('0')) continue;

  const values = {
    w: 0,
    x: 0,
    y: 0,
    z: 0
  }


  for (let j = 0; j < c - 200; j++) {
    const operation = input[j][0];
    const a = input[j][1];
    console.log(`w: ${values.w}`)
    console.log(`x: ${values.x}`)
    console.log(`y: ${values.y}`)
    console.log(`z: ${values.z}`)

    if (operation === "inp") {
      values.w = string[digit];
      digit++;
      continue;
    }

    const b = input[j][2]

    if (operation === "add") {
      values[a] += Object.keys(values).includes(b) ? values[b] : b;
      continue;
    }
    if (operation === "mul") {
      values[a] *= Object.keys(values).includes(b) ? values[b] : b;
      continue;
    }
    if (operation === "div") {
      values[a] /= Object.keys(values).includes(b) ? Math.floor(values[a] / values[b]) : Math.floor(values[a] / b);
      continue;
    }
    if (operation === "mod") {
      values[a] = values[a] % b;
      continue;
    }
    if (operation === "eql") {
      if (values[a] && Object.keys(values).includes(b)) {
        values[a] = values[a] === values[b] ? 1 : 0;
      } else {
        values[a] = values[a] === b ? 1 : 0;
      }
      continue;
    }
  }
  if (values.z === 0) {
    console.log(i);
    break;
  }
  const oldCount = count;
  count++;
  const end = performance.now();
  if (oldCount.toString().length < count.toString().length) console.log(`${count} : ${((end - start) / 1000).toFixed(2)} seconds`);

}