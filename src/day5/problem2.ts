import fs from 'fs';

function readInput() {
  const file = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');
  const lines = file.split('\r\n');

  const breakPoint = lines.findIndex((line) => line === '');

  const stacks = [];
  const rows = lines.slice(0, breakPoint - 1).reverse();

  for (let col = 1; col < lines[breakPoint - 1].length; col += 4) {
    stacks.push(rows.map((row) => row[col]).filter((item) => item !== ' '));
  }

  const instructions = lines.slice(breakPoint + 1).map((line) => {
    const [, ...nums] = line.match(/move (\d+) from (\d+) to (\d+)/) ?? [];
    return nums.map((num) => parseInt(num, 10));
  });

  return {
    stacks: stacks,
    instructions: instructions,
  };
}

function problem2() {
  const { stacks, instructions } = readInput();

  instructions.forEach(([number, from, to]) => {
    const poppedItems = stacks[from - 1].slice(number * -1);
    stacks[from - 1] = stacks[from - 1].slice(0, number * -1);
    stacks[to - 1] = [...stacks[to - 1], ...poppedItems];
  });

  const answer = stacks.map((stack) => stack[stack.length - 1]).join('');

  console.log(`Answer: ${answer}`);
}

problem2();
