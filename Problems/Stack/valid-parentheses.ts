function isValid(s: string): boolean {
    const stack = new Stack<string>();

    s.split('').forEach((v) => {
      const curr = stack.peek;

      console.log('DEBUG: ', curr, v, stack.size, stack.arr.length, stack.arr);

      if (!curr) {
        stack.push(v);
        return;
      }

      if (
        (curr === '(' && v === ')') ||
        (curr === '{' && v === '}') ||
        (curr === '[' && v === ']')
      ) {
        stack.pop();
      } else { 
        stack.push(v);
      }
    });

    return stack.size === 0;
};

class Stack<T> {
  arr: (T | undefined)[] = [];

  size: number = 0;

  get peek(): T | null {
    if (this.arr.length === 0 || this.size === 0) {
      return null;
    }

    return this.arr[this.size - 1] ?? null;
  }

  push(value: T): void {
    if (this.arr.length <= this.size) {
      this.arr.push(value);
    } else {
      this.arr[this.size < 0 ? 0 : this.size] = value;
    }

    this.size++;
  }

  pop(): void {
    this.arr[this.size - 1] = undefined;
    this.size--;
  }
}

console.warn(isValid('()'), true);
console.warn(isValid('(]'), false);
console.warn(isValid('()[]{}'), true);
console.warn(isValid('(([]){})'), true);
