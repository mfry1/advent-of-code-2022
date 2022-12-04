import fs from 'fs';
import { sumArray } from '../utils';

enum OpponentOption {
  Rock = 'A',
  Paper = 'B',
  Scissors = 'C',
}

enum PlayerOption {
  Rock = 'X',
  Paper = 'Y',
  Scissors = 'Z',
}

enum Result {
  Opponent,
  Player,
  Draw,
}

type Round = [OpponentOption, PlayerOption];

function readInput() {
  const file = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');
  const lines = file.split('\r\n');

  return lines.map((line) => line.split(' ') as Round);
}

function getWinner([opponent, player]: Round): Result {
  const resultTree = {
    [OpponentOption.Rock]: {
      [PlayerOption.Rock]: Result.Draw,
      [PlayerOption.Paper]: Result.Player,
      [PlayerOption.Scissors]: Result.Opponent,
    },
    [OpponentOption.Paper]: {
      [PlayerOption.Rock]: Result.Opponent,
      [PlayerOption.Paper]: Result.Draw,
      [PlayerOption.Scissors]: Result.Player,
    },
    [OpponentOption.Scissors]: {
      [PlayerOption.Rock]: Result.Player,
      [PlayerOption.Paper]: Result.Opponent,
      [PlayerOption.Scissors]: Result.Draw,
    },
  };

  return resultTree[opponent][player];
}

function scoreRound(round: Round) {
  let score = 0;

  const winner = getWinner(round);

  if (winner === Result.Player) {
    score += 6;
  } else if (winner === Result.Draw) {
    score += 3;
  }

  const player = round[1];

  if (player === PlayerOption.Rock) {
    score += 1;
  } else if (player === PlayerOption.Paper) {
    score += 2;
  } else {
    score += 3;
  }

  return score;
}

function scoreAllRounds(rounds: Round[]) {
  return sumArray(rounds.map((round) => scoreRound(round)));
}

function problem1() {
  const input = readInput();

  const score = scoreAllRounds(input);

  console.log(`Problem #1 Score: ${score}`);
}

problem1();
