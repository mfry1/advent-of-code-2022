import fs from 'fs';
import { sumArray } from '../utils';

function readInput() {
  return fs.readFileSync(`${__dirname}/input.txt`, 'utf-8').split('\r\n');
}

function addAtPath(
  structure: Record<string, unknown>,
  path: string[],
  newObj: Record<string, unknown>,
) {
  if (path.length === 1) {
    structure[path[0]] = {
      ...(structure[path[0]] as Record<string, unknown>),
      ...newObj,
    };
  } else if (path.length > 1) {
    const [, ...nextPath] = path;
    addAtPath(structure[path[0]] as Record<string, unknown>, nextPath, newObj);
  }
}

function processDir(
  directory: Record<string, unknown>,
  dirName: string,
  results: Record<string, number>,
) {
  const contents = Object.entries(directory).map(([name, item]) => {
    if (typeof item === 'string') {
      return parseInt(item, 10);
    }

    return processDir(
      item as Record<string, unknown>,
      `${dirName}-${name}`,
      results,
    );
  });

  const size = sumArray(contents);
  results[dirName] = size;
  return size;
}

function problem1() {
  const input = readInput();

  let currentPath: string[] = ['/'];
  let lastCommand = '';
  let structure = {};

  input.forEach((line) => {
    if (line.startsWith('$')) {
      lastCommand = line;

      if (line.startsWith('$ cd')) {
        const path = line.replace('$ cd ', '');
        if (path === '/') {
          currentPath = ['/'];
        } else if (path === '..') {
          currentPath.pop();
        } else {
          currentPath.push(path);
        }
      }
    } else if (lastCommand.startsWith('$ ls')) {
      const contents = line.split(' ');

      if (contents[0] === 'dir') {
        addAtPath(structure, currentPath, { [contents[1]]: {} });
      } else {
        addAtPath(structure, currentPath, { [contents[1]]: contents[0] });
      }
    }
  });

  let sizes: Record<string, number> = {};
  processDir(structure, '/', sizes);

  console.log(sizes);
  const answer = sumArray(
    Object.values(sizes).filter((size) => size <= 100000),
  );
  // console.log(JSON.stringify(structure, null, 2));
  console.log(`Answer: ${answer}`);
}

problem1();
