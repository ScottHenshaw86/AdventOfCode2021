// Advent Of Code 2021 - Day 6: Part 1
const fs = require("fs");

const input = fs
  .readFileSync("./input.txt", "latin1")
  .split(",")
  .map(Number);

  // This DID NOT work. Threw FATAL Javascript error.
  // for (let i=0; i< 256; i++) {
  //   for (let j=0; j<input.length; j++) {
  //     if (input[j] > 0) {
  //       input[j] = input[j] - 1
  //     } else {
  //       input[j] = 6;
  //       input.push(9);
  //     }
  //   }
  // }

const fishies = {
  0: 0,
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
  7: 0,
  8: 0,
};

input.forEach((a) => {
  fishies[a] = fishies[a] ? fishies[a] + 1 : 1;
})


for (let i=0; i< 256; i++) {
  const temp = JSON.parse(JSON.stringify(fishies))
  fishies[0] = temp[1];
  fishies[1] = temp[2];
  fishies[2] = temp[3];
  fishies[3] = temp[4];
  fishies[4] = temp[5];
  fishies[5] = temp[6];
  fishies[6] = temp[7] + temp[0];
  fishies[7] = temp[8];
  fishies[8] = temp[0];
}

let sum =0;
for (const a in fishies) {
  sum += fishies[a]
}

console.log(sum)