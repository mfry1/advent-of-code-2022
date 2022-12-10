import fs from 'fs';

function readInput() {
  return fs
    .readFileSync(`${__dirname}/input.txt`, 'utf-8')
    .split('\r\n')
    .map((row) => row.split(' '))
    .map(([direction, amount]) => [direction, parseInt(amount, 10)]);
}

async function problem() {
  const directions = readInput();

  const ropeLength = 10;
  const positions = new Array(ropeLength)
    .fill(null)
    .map(() => ({ x: 0, y: 0 }));
  const tailHistory = [{ ...positions[ropeLength - 1] }];

  directions.forEach(([direction, amount]) => {
    const headPosition = positions[0];

    for (let x = 0; x < amount; x += 1) {
      if (direction === 'U') {
        headPosition.y += 1;
      } else if (direction === 'D') {
        headPosition.y -= 1;
      } else if (direction === 'R') {
        headPosition.x += 1;
      } else if (direction === 'L') {
        headPosition.x -= 1;
      }

      for (let index = 1; index < positions.length; index += 1) {
        const leadPosition = positions[index - 1];
        const followPosition = positions[index];

        const horizontalDiff = Math.abs(followPosition.x - leadPosition.x);
        const verticalDiff = Math.abs(followPosition.y - leadPosition.y);
        if (
          (horizontalDiff > 1 && verticalDiff > 0) ||
          (horizontalDiff > 0 && verticalDiff > 1)
        ) {
          // Move diagonally
          followPosition.x += Math.sign(leadPosition.x - followPosition.x);
          followPosition.y += Math.sign(leadPosition.y - followPosition.y);
          if (index === positions.length - 1) {
            tailHistory.push({ ...followPosition });
          }
        } else if (horizontalDiff > 1) {
          // move horizontally
          followPosition.x += Math.sign(leadPosition.x - followPosition.x);
          if (index === positions.length - 1) {
            tailHistory.push({ ...followPosition });
          }
        } else if (verticalDiff > 1) {
          // move vertically
          followPosition.y += Math.sign(leadPosition.y - followPosition.y);
          if (index === positions.length - 1) {
            tailHistory.push({ ...followPosition });
          }
        }
      }
    }
  });

  const answer = new Set(tailHistory.map(({ x, y }) => `${x},${y}`)).size;

  console.log(`Answer: ${answer}`);
}

problem();
