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

enum ResultNeeded {
  Lose = 'X',
  Draw = 'Y',
  Win = 'Z',
}

type Round = [OpponentOption, ResultNeeded];

function readInput() {
  const file = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');
  const lines = file.split('\r\n');

  return lines.map((line) => line.split(' ') as Round);
}

function getPlayerInput([oppenent, result]: Round) {
  if (oppenent === OpponentOption.Rock) {
    switch (result) {
      case ResultNeeded.Lose:
        return PlayerOption.Scissors;
      case ResultNeeded.Win:
        return PlayerOption.Paper;
      default:
        return PlayerOption.Rock;
    }
  }

  if (oppenent === OpponentOption.Paper) {
    switch (result) {
      case ResultNeeded.Lose:
        return PlayerOption.Rock;
      case ResultNeeded.Win:
        return PlayerOption.Scissors;
      default:
        return PlayerOption.Paper;
    }
  }

  if (oppenent === OpponentOption.Scissors) {
    switch (result) {
      case ResultNeeded.Lose:
        return PlayerOption.Paper;
      case ResultNeeded.Win:
        return PlayerOption.Rock;
      default:
        return PlayerOption.Scissors;
    }
  }
}

function scoreRound(round: Round) {
  let score = 0;

  const playerInput = getPlayerInput(round);

  const result = round[1];

  if (result === ResultNeeded.Win) {
    score += 6;
  } else if (result === ResultNeeded.Draw) {
    score += 3;
  }

  if (playerInput === PlayerOption.Rock) {
    score += 1;
  } else if (playerInput === PlayerOption.Paper) {
    score += 2;
  } else {
    score += 3;
  }

  return score;
}

function scoreAllRounds(rounds: Round[]) {
  return sumArray(rounds.map((round) => scoreRound(round)));
}

function problem2() {
  const input = readInput();

  const score = scoreAllRounds(input);

  console.log(`Problem #1 Score: ${score}`);
}

problem2();
