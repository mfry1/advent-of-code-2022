import fs from 'fs';

function readInput() {
  const file = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');
  const lines = file.split('\r\n');

  return lines.map((line) =>
    line
      .split(',')
      .map((pair) => pair.split('-').map((num) => parseInt(num, 10))),
  );
}

function problem2() {
  const input = readInput();

  const overlappedCount = input.filter(
    ([pair1, pair2]) =>
      (pair1[0] <= pair2[0] && pair1[1] >= pair2[0]) ||
      (pair1[1] <= pair2[0] && pair1[1] >= pair2[1]) ||
      (pair2[0] <= pair1[0] && pair2[1] >= pair1[0]) ||
      (pair2[1] <= pair1[0] && pair2[1] >= pair1[1]),
  ).length;

  console.log(`Answer: ${overlappedCount}`);
}

problem2();
