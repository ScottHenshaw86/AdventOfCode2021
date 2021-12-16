// Advent Of Code 2021 - Day #: Part 1
const fs = require("fs");
const { getPackedSettings } = require("http2");
const { version } = require("os");

// import my puzzle input and format it into an array of numbers
const input = fs
  .readFileSync("./sample.txt", "latin1")

const binary = parseInt(input, 16).toString(2);

console.log(binary)

const versions = [];

const readPacket = (packet, i) => {
  if (!packet.includes(1)) return;
  const V = packet.substring(i,i+3);
  const T = packet.substring(i+3,i+6);
  versions.push(V);

  // for literal value packets
  if (parseInt(T, 2) == 4) {
    let start = i+6;
    let values = [];
    for (let i=0; i< packet.length; i++) {
      values.push(packet.substring(start+1, start+5))
      if (packet[start] == 0) break;
      start+=5
    }
    const val = parseInt(values.join(""), 2)
  } 
  // else { // for operator packets
  //   const I = packet.substring(6,7);
  //   if (I == 0) { // next 15 bits tell length of subpackets

  //   } else { // next 11 bits tell # of subpackets

  //   }
  // }
}

readPacket(binary);

// let total = 0;
// versions.map((a) => total += parseInt(a,2))

// console.log('ANSWER: ')
// console.log(total)

console.log(versions)