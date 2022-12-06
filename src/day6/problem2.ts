import fs from 'fs';

function readInput() {
  return fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');
}

function problem2() {
  const input = readInput();
  const packetSize = 14;

  let answer = -1;
  for (let i = packetSize; i < input.length; i += 1) {
    if (new Set(input.substring(i - packetSize, i)).size === packetSize) {
      answer = i;
      break;
    }
  }

  console.log(`Answer: ${answer}`);
}

problem2();
