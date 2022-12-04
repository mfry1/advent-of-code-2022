import fs from 'fs';

function readInput() {
  const file = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');
  const lines = file.split('\r\n');

  return lines;
}

// const testInput = [
//   'vJrwpWtwJgWrhcsFMMfFFhFp',
//   'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL',
//   'PmmdzqPrVvPwwTWBwg',
//   'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn',
//   'ttgJtRGJQctTZtZT',
//   'CrZsJsPPZsGzwwsLwLmpwMDw',
// ];

function problem2() {
  const input = readInput();
  let total = 0;

  const groups: string[][] = [];

  input.forEach((input, index) => {
    if (index % 3 === 0) {
      groups.push([input]);
    } else {
      groups[Math.floor(index / 3)].push(input);
    }
  });

  groups.forEach((group) => {
    for (let char of group[0]) {
      if (group[1].includes(char) && group[2].includes(char)) {
        const ascii = char.charCodeAt(0);

        if (ascii >= 97 && ascii <= 122) {
          total += ascii - 96;
        } else if (ascii >= 65 && ascii <= 90) {
          total += ascii - 38;
        }

        break;
      }
    }
  });

  console.log(`Problem #2: ${total}`);
}

problem2();
