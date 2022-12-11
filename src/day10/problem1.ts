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

  let total = 0;

  for (let i = 19; i < cycleStrengths.length; i += 40) {
    total += (i + 1) * cycleStrengths[i];
  }

  console.log(`Answer: ${total}`);
}

problem();
