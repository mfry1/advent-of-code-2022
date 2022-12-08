import fs from 'fs';
import { sumArray } from '../utils';

function readInput() {
  return fs
    .readFileSync(`${__dirname}/input.txt`, 'utf-8')
    .split('\r\n')
    .map((row) => row.split('').map((item) => parseInt(item, 10)));
}

function problem() {
  const grid = readInput();

  const visibleMap: boolean[][] = Array.from(
    Array(grid.length),
    () => new Array(grid[0].length),
  );

  for (let row = 0; row < grid.length; row += 1) {
    // Visible from left
    let tallestInRow = -1;
    for (let col = 0; col < grid[0].length; col += 1) {
      if (grid[row][col] > tallestInRow) {
        visibleMap[row][col] = true;
        tallestInRow = grid[row][col];
      }
    }

    // Visible from right
    tallestInRow = -1;
    for (let col = grid[0].length - 1; col >= 0; col -= 1) {
      if (grid[row][col] > tallestInRow) {
        visibleMap[row][col] = true;
        tallestInRow = grid[row][col];
      }
    }
  }

  for (let col = 0; col < grid[0].length; col += 1) {
    // tallest from top
    let tallestInCol = -1;
    for (let row = 0; row < grid.length; row += 1) {
      if (grid[row][col] > tallestInCol) {
        visibleMap[row][col] = true;
        tallestInCol = grid[row][col];
      }
    }

    // //tallest from bottom
    tallestInCol = -1;
    for (let row = grid.length - 1; row >= 0; row -= 1) {
      if (grid[row][col] > tallestInCol) {
        visibleMap[row][col] = true;
        tallestInCol = grid[row][col];
      }
    }
  }

  const answer = sumArray(visibleMap.map((row) => row.filter((x) => x).length));

  console.log(`Answer: ${answer}`);
}

problem();
