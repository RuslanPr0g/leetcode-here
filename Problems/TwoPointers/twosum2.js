function twoSum(numbers, target) {
    var result = [];
    var l = 0, r = numbers.length - 1;
    while (l < r) {
        var currentSum = numbers[l] + numbers[r];
        if (currentSum > target) {
            r--;
        }
        else if (currentSum < target) {
            l++;
        }
        else {
            result = [l + 1, r + 1];
            break;
        }
    }
    return result;
}
;
console.warn(twoSum([2, 7, 11, 15], 9), [1, 2]);
