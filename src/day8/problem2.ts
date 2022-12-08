import fs from 'fs';

function readInput() {
  return fs
    .readFileSync(`${__dirname}/input.txt`, 'utf-8')
    .split('\r\n')
    .map((row) => row.split('').map((item) => parseInt(item, 10)));
}

function problem() {
  const grid = readInput();

  const visibleMap: number[][][] = Array.from(
    Array(grid.length),
    () => new Array(grid[0].length),
  );

  for (let row = 0; row < grid.length; row += 1) {
    for (let col = 0; col < grid[0].length; col += 1) {
      const treeHeight = grid[row][col];
      visibleMap[row][col] = [];

      // Visibility to left
      let tallestBetween = 0;
      let count = 0;
      for (let x = col - 1; x >= 0; x -= 1) {
        const nextTreeHeight = grid[row][x];
        if (nextTreeHeight > tallestBetween || tallestBetween < treeHeight) {
          count += 1;
        }

        if (nextTreeHeight > tallestBetween) {
          tallestBetween = nextTreeHeight;
        }
      }
      visibleMap[row][col].push(count);

      // Visibility to right
      tallestBetween = 0;
      count = 0;
      for (let x = col + 1; x < grid[0].length; x += 1) {
        const nextTreeHeight = grid[row][x];
        if (nextTreeHeight > tallestBetween || tallestBetween < treeHeight) {
          count += 1;
        }

        if (nextTreeHeight > tallestBetween) {
          tallestBetween = nextTreeHeight;
        }
      }
      visibleMap[row][col].push(count);

      // Visibility to top
      tallestBetween = 0;
      count = 0;
      for (let y = row - 1; y >= 0; y -= 1) {
        const nextTreeHeight = grid[y][col];

        if (nextTreeHeight > tallestBetween || tallestBetween < treeHeight) {
          count += 1;
        }

        if (nextTreeHeight > tallestBetween) {
          tallestBetween = nextTreeHeight;
        }
      }
      visibleMap[row][col].push(count);

      // Bottom
      tallestBetween = 0;
      count = 0;
      for (let y = row + 1; y < grid[0].length; y += 1) {
        const nextTreeHeight = grid[y][col];
        if (nextTreeHeight > tallestBetween || tallestBetween < treeHeight) {
          count += 1;
        }

        if (nextTreeHeight > tallestBetween) {
          tallestBetween = nextTreeHeight;
        }
      }
      visibleMap[row][col].push(count);
    }
  }

  const scores = visibleMap.map((row) =>
    row.map((col) => {
      if (col.length < 4) {
        return 0;
      }

      return col[0] * col[1] * col[2] * col[3];
    }),
  );

  const answer = Math.max(...scores.map((row) => Math.max(...row)));

  console.log(`Answer: ${answer}`);
}

problem();
