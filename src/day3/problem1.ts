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

function problem1() {
  const input = readInput();
  let total = 0;

  input.forEach((inventory) => {
    const compartmentSize = inventory.length / 2;

    const compartment1 = inventory.slice(0, compartmentSize);
    const compartment2 = inventory.slice(compartmentSize);

    for (let char of compartment1) {
      if (compartment2.includes(char)) {
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

  console.log(`Problem #1: ${total}`);
}

problem1();
