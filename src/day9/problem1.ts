import fs from 'fs';

function readInput() {
  return fs
    .readFileSync(`${__dirname}/testInput2.txt`, 'utf-8')
    .split('\r\n')
    .map((row) => row.split(' '))
    .map(([direction, amount]) => [direction, parseInt(amount, 10)]);
}

async function problem() {
  const directions = readInput();

  const headPosition = { x: 0, y: 0 };
  const tailPosition = { x: 0, y: 0 };

  const tailHistory = [{ ...tailPosition }];
  const newDirections = [...directions];

  let count = 0;

  // for (let i = directions.length - 1; i >= 0; i -= 1) {
  //   const
  //   console.log(directions[i][1]);

  //   if ()
  // }

  directions.forEach(([direction, amount]) => {
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

      const horizontalDiff = Math.abs(tailPosition.x - headPosition.x);
      const verticalDiff = Math.abs(tailPosition.y - headPosition.y);
      if (
        (horizontalDiff > 1 && verticalDiff > 0) ||
        (horizontalDiff > 0 && verticalDiff > 1)
      ) {
        // Move diagonally
        tailPosition.x += Math.sign(headPosition.x - tailPosition.x);
        tailPosition.y += Math.sign(headPosition.y - tailPosition.y);
        tailHistory.push({ ...tailPosition });
      } else if (horizontalDiff > 1) {
        // move horizontally
        tailPosition.x += Math.sign(headPosition.x - tailPosition.x);
        tailHistory.push({ ...tailPosition });
      } else if (verticalDiff > 1) {
        // move vertically
        tailPosition.y += Math.sign(headPosition.y - tailPosition.y);
        tailHistory.push({ ...tailPosition });
      }
    }
  });

  const answer = new Set(tailHistory.map(({ x, y }) => `${x},${y}`)).size;
  console.log(tailHistory);
  console.log(`Answer: ${answer}`);
}

problem();
