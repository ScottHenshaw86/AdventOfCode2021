// Advent Of Code 2021 - Day 19: Part 1
const fs = require("fs");

// import my puzzle input and format it into an array of numbers
const input = fs
  .readFileSync("./sample.txt", "latin1")
  .split(/--- scanner [0-9] ---\n/g)
  .map((a) => a.split("\n"))
  .map((b) => b.filter((d) => d !== ""))
  .map((c) => c.map((d) => d.split(",")));

input.shift();

let diffs = [];

const c = input.length;
for (let i = 0; i < c; i++) {
  // loop through input arrays
  diffs.push([]);
  for (let j = 0; j < input[i].length; j++) {
    // loop through beacons
    diffs[i].push([]);
    for (let k = 0; k < input[i].length; k++) {
      // loop through rest of beacons
      if (j === k) continue; // don't need distance from self
      const x = Math.abs(input[i][j][0] - input[i][k][0]);
      const y = Math.abs(input[i][j][1] - input[i][k][1]);
      const z = Math.abs(input[i][j][2] - input[i][k][2]);
      let totalDiff = x * y * z;
      diffs[i][j].push(totalDiff);
    }
  }
}

diffs = diffs.flat();

flatInput = input.flat();

const scanners = [];

for (let i = 0; i < c; i++) {
  for (let j = 0; j < input[i].length; j++) {
    scanners.push(i);
  }
}

console.log(scanners);

const numScanners = new Set(scanners).size;

const overlappingBeacons = {};

const d = diffs.length;
for (let i = 0; i < d; i++) {
  for (let j = i + 1; j < d; j++) {
    let overlaps = 0;
    diffs[i].forEach((a) => {
      if (diffs[j].indexOf(a) > -1) overlaps++;
    });
    if (overlaps > 10) {
      if (!overlappingBeacons[scanners[i]]) {
        overlappingBeacons[scanners[i]] = {};
      }
      if (!overlappingBeacons[scanners[i]][scanners[j]]) {
        overlappingBeacons[scanners[i]][scanners[j]] = [];
      }
      overlappingBeacons[scanners[i]][scanners[j]].push(i, j);
    }
  }
}

const completed = [];

const scannerPositions = [[0, 0]];

const rotateAndOffset = (scanner) => {
  const numCompleted = new Set(completed).size;
  if (numCompleted === numScanners) {
    console.log("====== !FINISHED! ======");
    return;
  } // finished!

  if (completed.indexOf(scanner) > -1) {
    console.log("This scanner is already completed");
    return;
  }

  if (!overlappingBeacons[scanner]) {
    console.log("Scanner does not exist as a key");
    return;
  }

  for (overlapScanner in overlappingBeacons[scanner]) {
    const beacons = overlappingBeacons[scanner][overlapScanner];
    //   console.log(beacons)
    //   [
    //     0, 28,  1, 33,  3, 37,  4, 26,
    //     5, 49,  6, 43,  7, 35,  9, 25,
    //    12, 27, 14, 30, 19, 40, 24, 44
    //  ]

    const s1b1 = flatInput[beacons[0]].map(Number);
    const s2b1 = flatInput[beacons[1]].map(Number);
    const s1b2 = flatInput[beacons[2]].map(Number);
    const s2b2 = flatInput[beacons[3]].map(Number);

    let offsetX,
      offsetY,
      offsetZ,
      flipX,
      flipY,
      flipZ,
      xx = false,
      xy = false,
      xz = false,
      yx = false,
      yy = false,
      yz = false,
      zx = false,
      zy = false,
      zz = false;

    // rotation x
    // s1 x axis is s2 x axis
    if (
      Math.abs(s2b1[0] + (s1b1[0] - s2b1[0])) === Math.abs(s1b1[0]) &&
      Math.abs(s2b2[0] + (s1b2[0] - s2b2[0])) === Math.abs(s1b2[0])
    ) {
      if (s1b1[0] - s2b1[0] === s1b2[0] - s2b2[0]) {
        offsetX = s1b1[0] - s2b1[0];
        xx = true;
      }
      if (s1b1[0] + s2b1[0] === s1b2[0] + s2b2[0]) {
        offsetX = s1b1[0] + s2b1[0];
        xx = true;
      }
      if (s2b1[0] + offsetX === s1b1[0]) {
        flipX = false;
      } else if (-s2b1[0] + offsetX === s1b1[0]) {
        flipX = true;
      }
    }

    // rotation x
    // s1 x axis is s2 y axis
    if (
      Math.abs(s2b1[1] + (s1b1[0] - s2b1[1])) === Math.abs(s1b1[0]) &&
      Math.abs(s2b2[1] + (s1b2[0] - s2b2[1])) === Math.abs(s1b2[0])
    ) {
      if (s1b1[0] - s2b1[1] === s1b2[0] - s2b2[1]) {
        offsetY = s1b1[0] - s2b1[1];
        xy = true;
      }
      if (s1b1[0] + s2b1[1] === s1b2[0] + s2b2[1]) {
        offsetY = s1b1[0] + s2b1[1];
        xy = true;
      }
      if (s2b1[1] + offsetY === s1b1[0]) {
        flipY = false;
      } else if (-s2b1[1] + offsetY === s1b1[0]) {
        flipY = true;
      }
    }

    // rotation x
    // s1 x axis is s2 z axis
    if (
      Math.abs(s2b1[2] + (s1b1[0] - s2b1[2])) === Math.abs(s1b1[0]) &&
      Math.abs(s2b2[2] + (s1b2[0] - s2b2[2])) === Math.abs(s1b2[0])
    ) {
      if (s1b1[0] - s2b1[2] === s1b2[0] - s2b2[2]) {
        offsetZ = s1b1[0] - s2b1[2];
        xz = true;
      }
      if (s1b1[0] + s2b1[2] === s1b2[0] + s2b2[1]) {
        offsetZ = s1b1[0] + s2b1[2];
        xz = true;
      }
      if (s2b1[2] + offsetZ === s1b1[0]) {
        flipZ = false;
      } else if (-s2b1[2] + offsetZ === s1b1[0]) {
        flipZ = true;
      }
    }

    // rotation y
    // s1 y axis is s2 y axis
    if (
      Math.abs(s2b1[1] + (s1b1[1] - s2b1[1])) === Math.abs(s1b1[1]) &&
      Math.abs(s2b2[1] + (s1b2[1] - s2b2[1])) === Math.abs(s1b2[1])
    ) {
      if (s1b1[1] - s2b1[1] === s1b2[1] - s2b2[1]) {
        offsetY = s1b1[1] - s2b1[1];
        yy = true;
      }
      if (s1b1[1] + s2b1[1] === s1b2[1] + s2b2[1]) {
        offsetY = s1b1[1] + s2b1[1];
        yy = true;
      }
      if (s2b1[1] + offsetY === s1b1[1]) {
        flipY = false;
      } else if (-s2b1[1] + offsetY === s1b1[1]) {
        flipY = true;
      }
    }

    // rotation y
    // s1 y axis is s2 x axis
    if (
      Math.abs(s2b1[0] + (s1b1[1] - s2b1[0])) === Math.abs(s1b1[1]) &&
      Math.abs(s2b2[0] + (s1b2[1] - s2b2[0])) === Math.abs(s1b2[1])
    ) {
      if (s1b1[1] - s2b1[0] === s1b2[1] - s2b2[0]) {
        offsetX = s1b1[1] - s2b1[0];
        yx = true;
      }
      if (s1b1[1] + s2b1[0] === s1b2[1] + s2b2[0]) {
        offsetX = s1b1[1] + s2b1[0];
        yx = true;
      }
      if (s2b1[0] + offsetX === s1b1[1]) {
        flipX = false;
      } else if (-s2b1[0] + offsetX === s1b1[1]) {
        flipX = true;
      }
    }

    // rotation y
    // s1 y axis is s2 z axis
    if (
      Math.abs(s2b1[2] + (s1b1[1] - s2b1[2])) === Math.abs(s1b1[1]) &&
      Math.abs(s2b2[2] + (s1b2[1] - s2b2[2])) === Math.abs(s1b2[1])
    ) {
      if (s1b1[1] - s2b1[2] === s1b2[1] - s2b2[2]) {
        offsetZ = s1b1[1] - s2b1[2];
        yz = true;
      }
      if (s1b1[1] + s2b1[2] === s1b2[1] + s2b2[2]) {
        offsetZ = s1b1[1] + s2b1[2];
        yz = true;
      }
      if (s2b1[2] + offsetZ === s1b1[1]) {
        flipZ = false;
      } else if (-s2b1[2] + offsetZ === s1b1[1]) {
        flipZ = true;
      }
    }

    // rotation z
    // s1 z axis is s2 z axis
    if (
      Math.abs(s2b1[2] + (s1b1[2] - s2b1[2])) === Math.abs(s1b1[2]) &&
      Math.abs(s2b2[2] + (s1b2[2] - s2b2[2])) === Math.abs(s1b2[2])
    ) {
      if (s1b1[2] - s2b1[2] === s1b2[2] - s2b2[2]) {
        offsetZ = s1b1[2] - s2b1[2];
        zz = true;
      }
      if (s1b1[2] + s2b1[2] === s1b2[2] + s2b2[2]) {
        offsetZ = s1b1[2] + s2b1[2];
        zz = true;
      }
      if (s2b1[2] + offsetZ === s1b1[2]) {
        flipZ = false;
      } else if (-s2b1[2] + offsetZ === s1b1[2]) {
        flipZ = true;
      }
    }

    // rotation z
    // s1 z axis is s2 x axis
    if (
      Math.abs(s2b1[0] + (s1b1[2] - s2b1[0])) === Math.abs(s1b1[2]) &&
      Math.abs(s2b2[0] + (s1b2[2] - s2b2[0])) === Math.abs(s1b2[2])
    ) {
      if (s1b1[2] - s2b1[0] === s1b2[2] - s2b2[0]) {
        offsetX = s1b1[2] - s2b1[0];
        zx = true;
      }
      if (s1b1[2] + s2b1[0] === s1b2[2] + s2b2[0]) {
        offsetX = s1b1[2] + s2b1[0];
        zx = true;
      }
      if (s2b1[0] + offsetX === s1b1[2]) {
        flipX = false;
      } else if (-s2b1[0] + offsetX === s1b1[2]) {
        flipX = true;
      }
    }

    // rotation z
    // s1 z axis is s2 y axis
    if (
      Math.abs(s2b1[1] + (s1b1[2] - s2b1[1])) === Math.abs(s1b1[2]) &&
      Math.abs(s2b2[1] + (s1b2[2] - s2b2[1])) === Math.abs(s1b2[2])
    ) {
      if (s1b1[2] - s2b1[1] === s1b2[2] - s2b2[1]) {
        offsetY = s1b1[2] - s2b1[1];
        zy = true;
        // console.log(`offsetY: ${offsetY}`);
      }
      if (s1b1[2] + s2b1[1] === s1b2[2] + s2b2[1]) {
        offsetY = s1b1[2] + s2b1[1];
        zy = true;
        // console.log(`offsetY: ${offsetY}`);
      }
      if (s2b1[1] + offsetY === s1b1[2]) {
        // console.log(" no flip Y");
        flipY = "";
      } else if (-s2b1[1] + offsetY === s1b1[2]) {
        // console.log("flip Y");
        flipY = "-";
      }
    }

    console.log(`offsetX: ${offsetX}`);
    console.log(`offsetY: ${offsetY}`);
    console.log(`offsetZ: ${offsetZ}`);

    scannerPositions.push([offsetX, offsetY, offsetZ]);

    // offset Beacons
    let start = scanners.indexOf(parseInt(overlapScanner));
    let end = scanners.lastIndexOf(parseInt(overlapScanner));

    // for (let i = start; i < end; i++) {
    //   flatInput[i] = temp;
    // }

    completed.push(scanner);
    rotateAndOffset(overlapScanner);
  }
};

for (let i = 0; i < numScanners; i++) {
  rotateAndOffset(i);
}

console.log(scannerPositions);

// console.log(flatInput);

// GUESSES
// 10,000   - too low
// 30,000  - too high
// 20,000 - too high
