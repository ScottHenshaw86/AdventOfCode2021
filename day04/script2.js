// Advent Of Code 2021 - Day 4: Part 1
const fs = require("fs");

const input = fs
  .readFileSync("./input.txt", "latin1")
  .split(/\n+/g)
  .map((a) => {
    const b = a.split(" ");
    return b.filter((el) => el.length > 0);
  });

const orderPre = input.shift();
const order = orderPre[0].split(",");

let boards = [];
for (let i = 0; i < input.length - 1; i += 5) {
  const newArr = [];
  newArr.push(input[i], input[i + 1], input[i + 2], input[i + 3], input[i + 4]);
  boards.push(newArr);
}

let newBoards = [];
for (let i = 0; i < boards.length; i++) {
  newBoards.push(boards[i].join().split(","));
}

let winRound = 0;
let winner = 0;

for (let i = 0; i < newBoards.length; i++) {
  console.log(`i: ${i}`);
  const matches = [];
  let highIndex = 0;
  const c = newBoards[0].length;
  // console.log(newBoards[i][j]);
  for (let j = 0; j < order.length; j++) {
    if (newBoards[i].includes(order[j])) {
      matches.push(newBoards[i].indexOf(order[j]));
      highIndex = j;
      if (
        (matches.includes(0) &&
          matches.includes(1) &&
          matches.includes(2) &&
          matches.includes(3) &&
          matches.includes(4)) ||
        (matches.includes(5) &&
          matches.includes(6) &&
          matches.includes(7) &&
          matches.includes(8) &&
          matches.includes(9)) ||
        (matches.includes(10) &&
          matches.includes(11) &&
          matches.includes(12) &&
          matches.includes(13) &&
          matches.includes(14)) ||
        (matches.includes(15) &&
          matches.includes(16) &&
          matches.includes(17) &&
          matches.includes(18) &&
          matches.includes(19)) ||
        (matches.includes(20) &&
          matches.includes(21) &&
          matches.includes(22) &&
          matches.includes(23) &&
          matches.includes(24)) ||
        (matches.includes(0) &&
          matches.includes(5) &&
          matches.includes(10) &&
          matches.includes(15) &&
          matches.includes(20)) ||
        (matches.includes(1) &&
          matches.includes(6) &&
          matches.includes(11) &&
          matches.includes(16) &&
          matches.includes(21)) ||
        (matches.includes(2) &&
          matches.includes(7) &&
          matches.includes(12) &&
          matches.includes(17) &&
          matches.includes(22)) ||
        (matches.includes(3) &&
          matches.includes(8) &&
          matches.includes(13) &&
          matches.includes(18) &&
          matches.includes(23)) ||
        (matches.includes(4) &&
          matches.includes(9) &&
          matches.includes(14) &&
          matches.includes(19) &&
          matches.includes(24))
      ) {
        break;
      }
    }
  }
  console.log(`high index: ${highIndex}`);
  if (highIndex >= winRound) {
    winRound = highIndex;
    winner = i;
  }
}
const winningOrder = order.slice(0, winRound + 1);

let count = 0;

for (let i = 0; i < boards[0].length; i++) {
  for (let j = 0; j < boards[0][0].length; j++) {
    if (!winningOrder.includes(boards[winner][i][j])) {
      count += parseInt(boards[winner][i][j]);
    }
  }
}

// console.log("count");
// console.log(count);

console.log("ANSWER!!");
console.log(count * parseInt(winningOrder[winningOrder.length - 1]));

console.log("WIN ROUND");
console.log(winRound);
console.log("WINNER");
console.log(winner);
