// Advent Of Code 2021 - Day #: Part 1
const fs = require("fs");
const { getPackedSettings } = require("http2");
const { version } = require("os");

// import my puzzle input and format it into an array of numbers
const input = fs.readFileSync("./sample3.txt", "latin1");

let binary = parseInt(input, 16).toString(2);

// toString(2) cuts off leading zeros. Gotta put them back
while (binary.length % 4 !== 0) {
  binary = `0${binary}`;
}

// const readPacket = (packet) => {
//   console.log(packet);
//   if (!packet.includes(1)) return;
//   const V = packet.substring(0, 3);
//   const T = packet.substring(3, 6);
//   versions.push(V);

//   // for literal value packets
//   if (parseInt(T, 2) == 4) {
//     let start = 6;
//     let values = [];
//     for (let i = 0; i < packet.length; i++) {
//       values.push(packet.substring(start + 1, start + 5));
//       if (packet[start] == 0) break;
//       start += 5;
//     }
//     if (start + 5 < packet.length) {
//       readPacket(packet.slice(start + 5));
//     }
//     console.log(`START: ${start}`);
//     const val = parseInt(values.join(""), 2);
//   } else {
//     // for operator packets
//     const I = packet.substring(6, 7);
//     if (I == 0) {
//       // next 15 bits tell length of subpackets
//       const length = parseInt(packet.substring(7, 22), 2);
//       readPacket(packet.substring(22, 22 + length));
//     } else {
//       // next 11 bits tell # of subpackets
//       const numSub = parseInt(packet.substring(7, 18), 2);
//       readPacket(packet.slice(18));
//       console.log("FAIL");
//     }
//   }
// };

// readPacket(binary);

const versions = [];

const checkPacket = (length = 0, num = 0) => {
  let V = true; // for checking version
  let T = false; // for checking type ID
  let I = false; // for checking length type IDs
  let L = false; // for checking length
  let N = false; // for checking num packets inside
  let A = false; // for checking literal value

  let values = [];
  for (let i = 0; i < binary.length; i++) {
    if (V) {
      // check the version number
      versions.push(binary.substring(i, i + 3));
      i += 3;
      V = false;
      T = true;
    }
    if (T) {
      // check the packet Type ID
      if (parseInt(binary.substring(i, i + 3), 2) == 4) {
        T = false;
        A = true;
        i += 3;
      } else {
        T = false;
        I = true;
        i += 3;
      }
    }
    if (I) {
      // check the length type ID
      if (binary[i] == 0) {
        I = false;
        L = true;
      } else {
        I = false;
        N = true;
      }
    }
    if (L) {
      length = parseInt(binary.substring(i, i + 15), 2);
      L = false;
      V = true;
      i += 15;
    }
    if (N) {
      num = parseInt(binary.substring(i, i + 11), 2);
      N = false;
      V = true;
      i += 11;
    }
    if (A) {
      console.log(binary.substring(i, i + 5));
      values.push(binary.substring(i + 1, i + 5));
      if (binary[i] == 1) {
      } else {
        A = false;
        V = true;
      }
      i += 4;
    }
  }
};

checkPacket(binary);

let sum = 0;
versions.map((a) => (sum += parseInt(a, 2)));

console.log("ANSWER: ");
console.log(sum);

console.log(versions);
