// Advent Of Code 2021 - Day #: Part 1
const fs = require("fs");

// import my puzzle input and format it into an array of numbers
const input = fs
  .readFileSync("./input.txt", "latin1")
  .split("\n")
  .map((a) =>
    a.split(/[, ]/g).map((b) => {
      let c = b.replace(/[xyz]=/g, "");
      if (c.includes("..")) c = c.split("..").map(Number);
      return c;
    })
  );

input.splice(20); // only use first 20 elements for part 1
// console.log(input);

let total_volume = 0;

const c = input.length;
for (let i = 0; i < c; i++) {
  const x = input[i][1];
  const y = input[i][2];
  const z = input[i][3];
  if (input[i][0] === "on") {
    console.log(input[i])
    let cuboid_volume = (x[1]-x[0]) * (y[1]-y[0]) * (z[1]-z[0])

    // check if future cuboids intersect this one
    for (let j = i + 1; j < c; j++) {
      const x2 = input[j][1];
      const y2 = input[j][2];
      const z2 = input[j][3];

      if (x2[0] >= x[1] || x2[1] <= x[0]) continue;
      if (y2[0] >= y[1] || y2[1] <= y[0]) continue;
      if (z2[0] >= z[1] || z2[1] <= z[0]) continue;
      // console.log('OVERLAP')
      const overlap_point1 = [Math.max(x[0], x2[0]), Math.max(y[0], y2[0]), Math.max(z[0], z2[0])];
      const overlap_point2 = [Math.min(x[1], x2[1]), Math.min(y[1], y2[1]), Math.min(z[1], z2[1])];
      const minusVolume = (overlap_point2[0] - overlap_point1[0]) * (overlap_point2[1] - overlap_point1[1]) * (overlap_point2[2] - overlap_point1[2])
      cuboid_volume -= minusVolume;
    }
    total_volume = cuboid_volume > 0 ? total_volume + cuboid_volume : total_volume
    console.log(`cuboid volume: ${cuboid_volume}`)
  }
}

console.log(total_volume)


// ANSWER: 648681 -- part 1