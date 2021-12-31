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

const getOverlapVol = (cuboid1, cuboid2) => {
  const x1 = cuboid1[0];
  const y1 = cuboid1[1];
  const z1 = cuboid1[2];

  const x2 = cuboid2[0];
  const y2 = cuboid2[1];
  const z2 = cuboid2[2];

  if (x2[0] >= x1[1] || x2[1] <= x1[0]) return 0; // these cuboids do not overlap
  if (y2[0] >= y1[1] || y2[1] <= y1[0]) return 0; // overlap volume is 0;
  if (z2[0] >= z1[1] || z2[1] <= z1[0]) return 0;

  const overlap_point1 = [
    Math.max(x1[0], x2[0]),
    Math.max(y1[0], y2[0]),
    Math.max(z1[0], z2[0]),
  ];
  const overlap_point2 = [
    Math.min(x1[1], x2[1]),
    Math.min(y1[1], y2[1]),
    Math.min(z1[1], z2[1]),
  ];

  const volume =
    (overlap_point2[0] - overlap_point1[0]) *
    (overlap_point2[1] - overlap_point1[1]) *
    (overlap_point2[2] - overlap_point1[2]);

  return volume;
};

const c = input.length;
for (let i = 0; i < c; i++) {
  if (input[i][0] === "off") continue;
  const x = input[i][1];
  const y = input[i][2];
  const z = input[i][3];
  console.log(input[i]);
  let cuboid_volume = (x[1] - x[0]) * (y[1] - y[0]) * (z[1] - z[0]);

  // check if future cuboids intersect this one
  for (let j = i + 1; j < c; j++) {
    const x2 = input[j][1];
    const y2 = input[j][2];
    const z2 = input[j][3];
    cuboid_volume -= getOverlapVol([x, y, z], [x2, y2, z2]);
    for (let k = j + 1; k < c; k++) {
      const x3 = input[k][1];
      const y3 = input[k][2];
      const z3 = input[k][3];
      cuboid_volume += getOverlapVol([x2, y2, z2], [x3, y3, z3]);
    }
  }
  console.log("CUBOID VOLUME: ");
  console.log(cuboid_volume);
  total_volume += cuboid_volume;
}

console.log(total_volume);

// ANSWER: 648681 -- part 1
