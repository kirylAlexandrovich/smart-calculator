class SmartCalculator {
  constructor(value) {
    this.stack = [];
    this.stack.push('add', value);
  }

  add(value) {
    this.stack.push('add', value);
    return this;
  }
  subtract(value) {
    this.stack.push('subtract', value);
    return this;
  }
  multiply(value) {
    this.stack.push('multiply', value);
    return this;
  }
  devide(value) {
    this.stack.push('divide', value);
    return this;
  }
  pow(value) {
    this.stack.push('pow', value);
    return this;
  }
}

SmartCalculator.prototype.valueOf = function () {
  let result = 0;
  let previousAction = 0;
  let currentAction = 0;
  let currentValue = 0;
  let nextAction = 0;
  let nextValue = 0;

  for (let i = this.stack.length - 1; i >= 0; i--) {
    if ('pow' === this.stack[i]) {
      this.stack[i - 1] = Math.pow(this.stack[i - 1], this.stack[i + 1]);
      this.stack[i + 1] = 'a';
      this.stack[i] = 'a';
    }
  }

  currentAction = this.stack.shift();
  currentValue = this.stack.shift();
  previousAction = currentAction;

  while (true) {
    nextAction = this.stack.shift();
    nextValue = this.stack.shift();

    if ('add' === nextAction || 'subtract' === nextAction) {
      'add' === currentAction && (result += currentValue);
      'subtract' === currentAction && (result -= currentValue);
      previousAction = nextAction;
      currentAction = nextAction;
      currentValue = nextValue;
    } else {
      'multiply' === nextAction && (currentValue *= nextValue);
      'divide' === nextAction && (currentValue /= nextValue);
      this.stack.length > 0 && (currentAction = previousAction);
    }

    if (!this.stack.length) {
      'add' === currentAction && (result += currentValue);
      'subtract' === currentAction && (result -= currentValue);
      break;
    }
  };

  return result;
}

module.exports = SmartCalculator;
