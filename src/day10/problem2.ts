import fs from 'fs';

function readInput() {
  return fs
    .readFileSync(`${__dirname}/input.txt`, 'utf-8')
    .split('\r\n')
    .map((row) => row.split(' '))
    .map(([direction, amount]) => [
      direction,
      amount ? parseInt(amount, 10) : null,
    ]);
}

async function problem() {
  const directions = readInput();
  let cycleStrengths: number[] = [1];

  directions.forEach(([direction, amount]) => {
    const previousStrength = cycleStrengths[cycleStrengths.length - 1];

    if (direction === 'noop') {
      cycleStrengths.push(previousStrength);
    }

    if (direction === 'addx') {
      cycleStrengths.push(previousStrength, previousStrength + Number(amount));
    }
  });

  const grid: string[][] = [];

  for (let x = 0; x < cycleStrengths.length - 1; x += 1) {
    const row = Math.floor(x / 40);
    const col = x % 40;
    const strength = cycleStrengths[x];
    const range = [strength - 1, strength, strength + 1];

    if (cycleStrengths)
      grid[row] = [
        ...(grid[row] ?? []),
        range.includes(col) ? String('#') : ' ',
      ];
  }

  grid.forEach((row) => {
    console.log(row.join(' '));
  });
}
problem();
