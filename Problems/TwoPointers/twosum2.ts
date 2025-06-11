function twoSum(numbers: number[], target: number): number[] {
  let result: number[] = []
  let l = 0, r = numbers.length - 1;

  while (l < r) {
    const currentSum = numbers[l] + numbers[r];

    if (currentSum > target) {
      r--;
    } else if (currentSum < target) {
      l++;
    } else {
      result = [l + 1, r + 1];
      break;
    }
  }

  return result;
};

console.warn(twoSum([2,7,11,15], 9), [1,2]);
