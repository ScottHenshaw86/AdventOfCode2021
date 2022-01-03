// Advent Of Code 2021 - Day #: Part 1
const fs = require("fs");

// import my puzzle input and format it into an array of numbers
const input = fs
  .readFileSync("./NEWsample.txt", "latin1")
  .split("\n")
  .map((a) =>
    a.split(/[, ]/g).map((b) => {
      let c = b.replace(/[xyz]=/g, "");
      if (c.includes("..")) c = c.split("..").map(Number);
      return c;
    })
  );

// input.splice(20); // only use first 20 elements for part 1
// TODO: remove this
input.splice(3); // only use first 20 elements for part 1
// console.log(input);

let total_volume = 0;

// cuboid = [[x1,x2], [y1,y2], [z1,z2]] 
const getOverlapPoints = (cuboid1, cuboid2) => {

  const x = cuboid1[0];
  const y = cuboid1[1];
  const z = cuboid1[2];

  const x2 = cuboid2[0];
  const y2 = cuboid2[1];
  const z2 = cuboid2[2];

    if (x2[0] > x[1] || x2[1] < x[0]) return null;
    if (y2[0] > y[1] || y2[1] < y[0]) return null;
    if (z2[0] > z[1] || z2[1] < z[0]) return null;

    const overlap_point1 = [
      Math.max(x[0], x2[0]),
      Math.max(y[0], y2[0]),
      Math.max(z[0], z2[0]),
    ];
    const overlap_point2 = [
      Math.min(x[1], x2[1]),
      Math.min(y[1], y2[1]),
      Math.min(z[1], z2[1]),
    ];

    const x3 = [overlap_point1[0], overlap_point2[0]]
    const y3 = [overlap_point1[1], overlap_point2[1]]
    const z3 = [overlap_point1[2], overlap_point2[2]]

    const overlapCuboid = [x3, y3, z3]

  return overlapCuboid
}

// cuboid = [[x1,x2], [y1,y2], [z1,z2]] 
const getVolume = (cuboid) => {
  return (cuboid[0][1] - cuboid[0][0] + 1)*(cuboid[1][1] - cuboid[1][0] + 1)*(cuboid[2][1] - cuboid[2][0] + 1);
}

///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
/////////////////////////////  MAIN LOOP  /////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

const c = input.length;
for (let i = 0; i < c; i++) {
  console.log(`~~~~~~~~~~~~~~~~~ i: ${i} ~~~~~~~~~~~~~~~~~`)
  if (input[i][0] === "off") continue;
  const x = input[i][1];
  const y = input[i][2];
  const z = input[i][3];
  let cuboid_volume = getVolume([x,y,z]);

  // check if future cuboids intersect this one
  for (let j = i + 1; j < c; j++) {
    console.log(`~~~~~~~~~~~~~~~~~ j: ${j} ~~~~~~~~~~~~~~~~~`)
    const x2 = input[j][1];
    const y2 = input[j][2];
    const z2 = input[j][3];

    let overlapArea = getOverlapPoints([x, y, z], [x2, y2, z2]);
    if (!overlapArea) continue;
    console.log(`overlap: ${overlapArea}`)
    console.log(overlapArea)

    let overlapVolume = getVolume(overlapArea)
    console.log(`overlapVolume: ${overlapVolume}`)

    for (let k=j+1; k<c; k++) {
      console.log(`~~~~~~~~~~~~~~~~~ k: ${k} ~~~~~~~~~~~~~~~~~`)
    const x3 = input[k][1];
    const y3 = input[k][2];
    const z3 = input[k][3];

      overlapArea = getOverlapPoints(overlapArea, [x3, y3, z3])
      if (!overlapArea) continue;
    console.log(`overlap: ${overlapArea}`)
    console.log(overlapArea)
    }

  }
}

console.log(total_volume);

// ANSWER: 648681 -- part 1
