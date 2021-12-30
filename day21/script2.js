// Advent Of Code 2021 - Day 21: Part 2
const fs = require("fs");
const start = performance.now();

// Sample
const player1 = {
  pos: 4,
  score: 0,
};

const player2 = {
  pos: 8,
  score: 0,
};

const state = {
  p1_score: 0,
  p1_pos: 4,
  p2_score: 0,
  ps_pos: 8,
};

const board = [0,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9]

let p1Wins = 0;
let p2Wins = 0;

const playGame = (p1_score, p1_pos, p2_score, p2_pos, turn, multiplier) => {

  if (turn === "p1") {
    const score = p2_score + p2_pos;
    if (score >= 21) {
      p2Wins+=multiplier;
      return;
    }
    playGame(p1_score, board[p1_pos + 3] , score, p2_pos, "p2", multiplier * 1)
    playGame(p1_score, board[p1_pos + 4] , score, p2_pos, "p2", multiplier * 3)
    playGame(p1_score, board[p1_pos + 5] , score, p2_pos, "p2", multiplier * 6)
    playGame(p1_score, board[p1_pos + 6] , score, p2_pos, "p2", multiplier * 7)
    playGame(p1_score, board[p1_pos + 7] , score, p2_pos, "p2", multiplier * 6)
    playGame(p1_score, board[p1_pos + 8] , score, p2_pos, "p2", multiplier * 3)
    playGame(p1_score, board[p1_pos + 9] , score, p2_pos, "p2", multiplier * 1)
  } 
  
  else {
    const score = p1_score + p1_pos;
    if (score >= 21) {
      p1Wins+=multiplier;
      return;
    }
    playGame(score, p1_pos, p2_score, board[p2_pos + 3], "p1", multiplier * 1)
    playGame(score, p1_pos, p2_score, board[p2_pos + 4], "p1", multiplier * 3)
    playGame(score, p1_pos, p2_score, board[p2_pos + 5], "p1", multiplier * 6)
    playGame(score, p1_pos, p2_score, board[p2_pos + 6], "p1", multiplier * 7)
    playGame(score, p1_pos, p2_score, board[p2_pos + 7], "p1", multiplier * 6)
    playGame(score, p1_pos, p2_score, board[p2_pos + 8], "p1", multiplier * 3)
    playGame(score, p1_pos, p2_score, board[p2_pos + 9], "p1", multiplier * 1)
  }

};

// playGame(0, 4, -8, 8, "p1", 1); SAMPLE
playGame(0, 10, -4, 4, "p1", 1); // my Input

console.log(`p1Wins: ${p1Wins}`)
console.log(`p2Wins: ${p2Wins}`)

const end = performance.now();

console.log(`Time: ${end - start} ms`)  // ~775ms