export function sumArray(array: number[]) {
  return array.reduce((sum, item) => sum + item);
}

export function sortArrayBySum(arrays: number[][]) {
  return arrays.sort((a, b) => {
    const sumA = sumArray(a);
    const sumB = sumArray(b);

    if (sumA > sumB) {
      return -1;
    }

    if (sumA < sumB) {
      return 1;
    }

    return 0;
  });
}
