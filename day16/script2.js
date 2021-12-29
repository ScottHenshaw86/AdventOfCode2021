// Advent Of Code 2021 - Day 16: Part 2

const fs = require("fs");

// let binary = fs.readFileSync("./input.txt", "latin1");

let binary = "C200B40A82";
//110 000 1 00000000010 110 100 00001 010 100 00010

// let binary = "38006F45291200";

//123 456 7 89012345678 90
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

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//          Started over from scratch.
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const stack = [];

const actions = ["+", "*", ",", ",", "literal", ">", "<", "=="];

let string = "";
let bitCount = 0;
let packetCount = 0;

const c = binary.length;
for (let i = 0; i < c; i++) {
  // TODO: need conditions to handle stack
  // check if stack[stack.length - 1] is complete. if so, handle it. and reset count to 0
  // if not, need to add to the count.
  let current = stack[stack.length - 1];
  console.log(current);
  if (stack.length > 0) {
    if (bitCount == current.length || packetCount == current.length) {
      console.log("TRUE");
      string = `${string})`;
      count = 0;
    }
  }

  if (!binary.slice(i).includes(1)) break;
  // const V = binary.substring(i, i + 3);

  const T = binary.substring(i + 3, i + 6);

  if (parseInt(T, 2) == 4) {
    // this is a literal value
    console.log("LITERAL");
    let j = i + 6;
    let litValue = binary.substring(j + 1, j + 5);
    while (binary[j] != 0) {
      litValue = `${litValue}${binary.substring(j + 1, j + 5)}`;
      j += 4;
    }
    bitCount += j + 5 - i;
    packetCount++;
    i = j + 4;
    console.log(litValue);
    string = `${string}${current.action}${parseInt(litValue, 2)}`;
    continue;
  }

  // must be an operator packet
  string = `${string}(`;
  const action = actions[parseInt(T, 2)];
  const I = binary[i + 6];

  // console.log(binary.substring(i + 7, i + 18));
  // console.log(binary.substring(i + 7, i + 22));
  if (I == 1)
    stack.push({
      length: parseInt(binary.substring(i + 7, i + 18), 2),
      action: action,
    });
  if (I == 0)
    stack.push({
      length: parseInt(binary.substring(i + 7, i + 22), 2),
      action: action,
    });

  if (I == 0) {
    i += 21;
  } else {
    i += 17;
  }
}

// console.log(stack);
console.log(string);
console.log(bitCount);
console.log(packetCount);
