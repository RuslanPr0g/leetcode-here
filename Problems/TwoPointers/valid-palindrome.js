function isPalindrome(s) {
    if (s.length === 0) {
        return false;
    }
    var isLetter = function (c) { return /^[a-zA-Z0-9]+$/.test(c); };
    if (s.length === 1) {
        return true;
    }
    if (s.length === 2) {
        var leftLetter = s[0].toLowerCase();
        var rightLetter = s[1].toLowerCase();
        if (!isLetter(leftLetter) && !isLetter(rightLetter)) {
            return true;
        }
        if ((isLetter(leftLetter) || isLetter(rightLetter)) && !(isLetter(leftLetter) && isLetter(rightLetter))) {
            return true;
        }
        if (leftLetter === rightLetter) {
            return true;
        }
        else {
            return false;
        }
    }
    var leftPerson = 0;
    var rightPerson = s.length - 1;
    var sChars = s.split('');
    while (rightPerson >= leftPerson) {
        var leftLetter = sChars[leftPerson].toLowerCase();
        var rightLetter = sChars[rightPerson].toLowerCase();
        if (leftLetter !== rightLetter) {
            return false;
        }
        while (!isLetter(sChars[leftPerson + 1])) {
            leftPerson++;
        }
        leftPerson++;
        while (!isLetter(sChars[rightPerson - 1])) {
            rightPerson--;
        }
        rightPerson--;
    }
    return true;
}
;
console.warn(isPalindrome('ccc'), true);
console.warn(isPalindrome('A man, a plan, a canal: Panama'), true);
console.warn(isPalindrome('race a car'), false);
console.warn(isPalindrome('a.'), true);
console.warn(isPalindrome('0P'), false);
