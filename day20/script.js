// Advent Of Code 2021 - Day 20: Part 1
const fs = require("fs");

// import my puzzle input and format it into an array of numbers
const input = fs.readFileSync("./input.txt", "latin1").split("\n");

const algo = input.shift();
// console.log(algo);
input.shift(); // remove empty element

let c = input.length;
// need to add extra array to top and bottom
const tempStr = ".".repeat(c + 20);

for (let i = 0; i < c; i++) {
  input[i] = `..........${input[i]}..........`;
}

input.unshift(tempStr);
input.unshift(tempStr);
input.unshift(tempStr);
input.unshift(tempStr);
input.unshift(tempStr);
input.unshift(tempStr);
input.unshift(tempStr);
input.unshift(tempStr);
input.unshift(tempStr);
input.unshift(tempStr);
input.push(tempStr);
input.push(tempStr);
input.push(tempStr);
input.push(tempStr);
input.push(tempStr);
input.push(tempStr);
input.push(tempStr);
input.push(tempStr);
input.push(tempStr);
input.push(tempStr);

let enhancedImage = [];

const analyzePixel = (i, j, arr) => {
  const upLeft = arr[i - 1]?.[j - 1] ? arr[i - 1][j - 1] : ".";
  const up = arr[i - 1]?.[j] ? arr[i - 1][j] : ".";
  const upRight = arr[i - 1]?.[j + 1] ? arr[i - 1][j + 1] : ".";
  const left = arr[i][j - 1] ? arr[i][j - 1] : ".";
  const current = arr[i][j];
  const right = arr[i][j + 1] ? arr[i][j + 1] : ".";
  const downLeft = arr[i + 1]?.[j - 1] ? arr[i + 1][j - 1] : ".";
  const down = arr[i + 1]?.[j] ? arr[i + 1][j] : ".";
  const downRight = arr[i + 1]?.[j + 1] ? arr[i + 1][j + 1] : ".";
  let total = `${upLeft}${up}${upRight}${left}${current}${right}${downLeft}${down}${downRight}`;
  total = total.replace(/\./g, "0");
  total = total.replace(/#/g, "1");
  return algo[parseInt(total, 2)];
};

const d = input.length;
for (let i = 0; i < d; i++) {
  for (let j = 0; j < d; j++) {
    const value = analyzePixel(i, j, input);
    if (!enhancedImage[i]) {
      enhancedImage.push([]);
    }
    enhancedImage[i][j] = value;
  }
}

enhancedImage = enhancedImage.map((a) => a.join(""));

let doublyEnhancedImage = [];

for (let i = 0; i < d; i++) {
  for (let j = 0; j < d; j++) {
    const value = analyzePixel(i, j, enhancedImage);
    if (!doublyEnhancedImage[i]) {
      doublyEnhancedImage.push([]);
    }
    doublyEnhancedImage[i][j] = value;
  }
}

console.log(doublyEnhancedImage);

let count = 0;
let e = doublyEnhancedImage.length;
for (let i = 0; i < e; i++) {
  for (let j = 0; j < e; j++) {
    if (doublyEnhancedImage[i][j] === "#") {
      count++;
    }
  }
}

console.log(count);
