import fs from 'fs';
import { sortArrayBySum, sumArray } from '../utils';

type Inventory = number[];

function readInput() {
  const file = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');
  const lines = file.split('\r\n');

  const inventories: Inventory[] = [];
  let activeInventory: Inventory = [];

  lines.forEach((line) => {
    if (line === '') {
      inventories.push(activeInventory);
      activeInventory = [];
    } else {
      activeInventory.push(parseInt(line, 10));
    }
  });

  return inventories;
}

function problem1() {
  const inventories = readInput();

  const sortedArray = sortArrayBySum(inventories);
  const totalCalories = sumArray(sortedArray[0]);

  console.log(`Answer #1: ${totalCalories} calories`);
}

function problem2() {
  const inventories = readInput();

  const sortedArray = sortArrayBySum(inventories);
  const totalCalories = sumArray(
    sortedArray.slice(0, 3).map((item) => sumArray(item)),
  );

  console.log(`Answer #2: ${totalCalories} calories`);
}

problem1();
problem2();
