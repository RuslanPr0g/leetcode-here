function isValid(s) {
    var stack = new Stack();
    s.split('').forEach(function (v) {
        var curr = stack.peek;
        console.log('DEBUG: ', curr, v, stack.size, stack.arr.length, stack.arr);
        if (!curr) {
            stack.push(v);
            return;
        }
        if ((curr === '(' && v === ')') ||
            (curr === '{' && v === '}') ||
            (curr === '[' && v === ']')) {
            stack.pop();
        }
        else {
            stack.push(v);
        }
    });
    return stack.size === 0;
}
;
var Stack = /** @class */ (function () {
    function Stack() {
        this.arr = [];
        this.size = 0;
    }
    Object.defineProperty(Stack.prototype, "peek", {
        get: function () {
            var _a;
            if (this.arr.length === 0 || this.size === 0) {
                return null;
            }
            return (_a = this.arr[this.size - 1]) !== null && _a !== void 0 ? _a : null;
        },
        enumerable: false,
        configurable: true
    });
    Stack.prototype.push = function (value) {
        if (this.arr.length <= this.size) {
            this.arr.push(value);
        }
        else {
            this.arr[this.size < 0 ? 0 : this.size] = value;
        }
        this.size++;
    };
    Stack.prototype.pop = function () {
        this.arr[this.size - 1] = undefined;
        this.size--;
    };
    return Stack;
}());
console.warn(isValid('()'), true);
console.warn(isValid('(]'), false);
console.warn(isValid('()[]{}'), true);
console.warn(isValid('(([]){})'), true);
