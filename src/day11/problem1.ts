import fs from 'fs';

interface Monkey {
  index: number;
  inventory: number[];
  operation: {
    operator: string;
    operand: string;
  };
  test: {
    number: number;
    pass: number;
    fail: number;
  };
  inspectCount: number;
}

function readInput() {
  const lines = fs
    .readFileSync(`${__dirname}/input.txt`, 'utf-8')
    .split('\r\n');

  const monkeys: Monkey[] = [];

  lines.forEach((line, index) => {
    const monkeyIndex = Math.floor(index / 7);
    const dataPoint = index % 7;

    if (dataPoint === 0) {
      monkeys.push({ index: monkeyIndex, inspectCount: 0 } as Monkey);
    } else if (dataPoint === 1) {
      monkeys[monkeyIndex].inventory = line
        .replace('  Starting items: ', '')
        .split(', ')
        .map((item) => parseInt(item, 10));
    } else if (dataPoint === 2) {
      const [operator, operand] = line
        .replace('  Operation: new = old ', '')
        .split(' ');
      monkeys[monkeyIndex].operation = { operator, operand };
    } else if (dataPoint === 3) {
      monkeys[monkeyIndex].test = {
        number: parseInt(line.replace('  Test: divisible by ', ''), 10),
      } as Monkey['test'];
    } else if (dataPoint === 4) {
      monkeys[monkeyIndex].test.pass = parseInt(
        line.replace('    If true: throw to monkey ', ''),
        10,
      );
    } else if (dataPoint === 5) {
      monkeys[monkeyIndex].test.fail = parseInt(
        line.replace('    If false: throw to monkey ', ''),
        10,
      );
    }
  });

  return monkeys;
}

function calculateWorry(old: number, operator: string, operand: string) {
  const newOperand = operand === 'old' ? old : parseInt(operand, 10);
  let operationResult = 0;

  switch (operator) {
    case '*': {
      operationResult = old * newOperand;
      break;
    }
    case '+': {
      operationResult = old + newOperand;
      break;
    }
    default:
      throw new Error('unexpected operator');
  }

  return Math.floor(operationResult / 3);
}

async function problem() {
  const monkeys = readInput();

  const roundCount = 20;

  for (let round = 0; round < roundCount; round += 1) {
    monkeys.forEach((monkey) => {
      monkey.inventory.forEach((item) => {
        monkey.inspectCount += 1;
        const newWorry = calculateWorry(
          item,
          monkey.operation.operator,
          monkey.operation.operand,
        );

        if (newWorry % monkey.test.number === 0) {
          monkeys[monkey.test.pass].inventory.push(newWorry);
        } else {
          monkeys[monkey.test.fail].inventory.push(newWorry);
        }
      });
      monkey.inventory = [];
    });
  }

  const answer = monkeys
    .map((monkey) => monkey.inspectCount)
    .sort((a, b) => a - b)
    .reverse();

  console.log(`Answer: ${answer[0] * answer[1]}`);
}

problem();
