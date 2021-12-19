const obj = {
    1: {
        type: 4,
        length: 17
    }
}

const depth = 2;

obj[2] = {
    type: 5,
    length: 18
}

console.log(obj)

obj[2] = 0;

console.log(obj)