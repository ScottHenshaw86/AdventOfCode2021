// Advent Of Code 2021 - Day 16: Part 2

const fs = require("fs");

let binary = fs.readFileSync("./input.txt", "latin1");

// let binary = "D2FE28";
// let binary = "C200B40A82";
// let binary = '04005AC33890'
// let binary = '880086C3E88112'
// let binary = 'CE00C43D881120'
// let binary = 'D8005AC2A8F0'
// let binary = 'F600BC2D8F'
// let binary = '9C005AC2F8F0'
// let binary = '9C0141080250320F1802104A08'

const binaryMap = {
  0: "0000",
  1: "0001",
  2: "0010",
  3: "0011",
  4: "0100",
  5: "0101",
  6: "0110",
  7: "0111",
  8: "1000",
  9: "1001",
  A: "1010",
  B: "1011",
  C: "1100",
  D: "1101",
  E: "1110",
  F: "1111",
};

const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];

arr.forEach((a) => {
  const regex = new RegExp(a, "g");
  binary = binary.replace(regex, binaryMap[a]);
});

console.log(binary)

const packets = [];
const typeIDs = [];
const values = [];
const I = [];
const L = [];

const c = binary.length;
for (let i = 0; i < c; ) {
  if (!binary.slice(i).includes(1)) break;
  const V = binary.substring(i, i + 3);

  const T = binary.substring(i + 3, i + 6);
  typeIDs.push(parseInt(T, 2));
  if (parseInt(T, 2) == 4) {
    let j = i + 6;
    let value = [];
    while (binary[j] != 0) {
      value.push(binary.substring(j+1, j+5))
      j += 5;
    }
    value.push(binary.substring(j+1, j+5))
    packets.push(binary.slice(i, j + 5));
    values.push(parseInt(value.join(""),2));
    i = j + 5;
    I.push('X')
    L.push('X')
    continue;
  } else {
    if (binary[i + 6] == 0) {
      packets.push(binary.slice(i, i + 22));
      I.push(0)
      L.push(parseInt(binary.substring(i+7, i+22), 2))
      i += 22;
    } else {
      packets.push(binary.slice(i, i + 18));
      I.push(1)
      L.push(parseInt(binary.substring(i+7, i+18), 2))
      i += 18;
    }
    values.push('?');
  }
}

for (let i = 0; i < packets.length; i++) {
  console.log(`========== ${i} ===========`)
  console.log(`packet: ${packets[i]}`);
  console.log(`TypeID: ${typeIDs[i]}`);
  console.log(`I: ${I[i]}`)
  console.log(`L: ${L[i]}`)
  console.log(`Value: ${values[i]}`)
}
