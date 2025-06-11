function isPalindrome(s: string): boolean {
  if (s.length === 0) {
    return false;
  }

  const isLetter = (c) => /^[a-zA-Z0-9]+$/.test(c); 

  s = s.split('').filter(x => isLetter(x)).toString();

  if (s.length === 1) {
    return true;
  }

  if (s.length === 2) {
    const leftLetter = s[0].toLowerCase();
    const rightLetter = s[1].toLowerCase();

    if (!isLetter(leftLetter) && !isLetter(rightLetter)) {
      return true;
    }

    if ((isLetter(leftLetter) || isLetter(rightLetter)) && !(isLetter(leftLetter) && isLetter(rightLetter)))
    {
      return true;
    }

    if (leftLetter === rightLetter) {
      return true;
    } else {
      return false;
    }
  }

  let leftPerson = 0;
  let rightPerson = s.length - 1;

  const sChars = s.split('');

  while (rightPerson >= leftPerson) {
    const leftLetter = sChars[leftPerson].toLowerCase();
    const rightLetter = sChars[rightPerson].toLowerCase();

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
};

console.warn(isPalindrome('ccc'), true);
console.warn(isPalindrome('A man, a plan, a canal: Panama'), true);
console.warn(isPalindrome('race a car'), false);
console.warn(isPalindrome('a.'), true);
console.warn(isPalindrome('0P'), false);

