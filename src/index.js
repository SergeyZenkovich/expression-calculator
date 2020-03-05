function eval() {
  // Do not use eval!!!
  return;
}

function expressionCalculator(expr) {
  const objectWithAction = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => {
      if (b === 0) {
        throw new Error('TypeError: Division by zero.');
      }
      return a / b;
    }
  };
  let expressionWithoutSpaces = expr
    .split('')
    .filter(el => el !== ' ' && el !== '  ');
  expressionWithoutSpaces = expressionWithoutSpaces.join('');

  let expressionArr = expressionWithoutSpaces.split('').map(el => {
    if (
      el === '+' ||
      el === '-' ||
      el === '*' ||
      el === '/' ||
      el == '(' ||
      el === ')'
    ) {
      return ` ${el} `;
    }
    return el;
  });
  expressionArr = expressionArr.join('').split(' ');
  expressionArr = expressionArr.filter(el => el !== '');
  let opensBrackets = expressionArr.filter(el => el === '(');
  let closesBrackets = expressionArr.filter(el => el === ')');

  if (
    (opensBrackets.length !== 0 || closesBrackets.length !== 0) &&
    opensBrackets.length !== closesBrackets.length
  ) {
    throw new Error('ExpressionError: Brackets must be paired');
  }
  let copyArr = [...expressionArr];
  while (copyArr.includes('(')) {
    let max = 0;
    let temp = 0;
    let maxStr = '';
    let tempStr = '';

    for (var i = 0; i < copyArr.length; i++) {
      if (copyArr[i] === '(') {
        tempStr = '';
        temp++;
        tempStr += `${i}----${copyArr[i]}`;
      } else if (copyArr[i] === ')') {
        tempStr += copyArr[i];
        if (temp > max) {
          max = temp;
          maxStr = tempStr;
        }
        temp--;
        tempStr = '';
      } else if (
        copyArr[i] === '+' ||
        copyArr[i] === '-' ||
        copyArr[i] === '*' ||
        copyArr[i] === '/'
      ) {
        tempStr += ` ${copyArr[i]} `;
      } else {
        tempStr += copyArr[i];
      }
    }
    debugger;
    let a = maxStr.split('----');
    let start = +a[0];
    let arr = a[1].slice(1, a[1].length - 1).split(' ');

    let lengthOfSlice = arr.length;

    while (
      arr.includes('+') ||
      arr.includes('-') ||
      arr.includes('*') ||
      arr.includes('/')
    ) {
      let Action;
      if (arr.includes('*') && arr.includes('/')) {
        Action =
          arr.indexOf('*') < arr.indexOf('/')
            ? ['*', arr.indexOf('*')]
            : ['/', arr.indexOf('/')];
      } else if (arr.includes('*')) {
        Action = ['*', arr.indexOf('*')];
      } else if (arr.includes('/')) {
        Action = ['/', arr.indexOf('/')];
      } else if (arr.includes('+') && arr.includes('-')) {
        Action =
          arr.indexOf('+') < arr.indexOf('-')
            ? ['+', arr.indexOf('+')]
            : ['-', arr.indexOf('-')];
      } else if (arr.includes('+')) {
        Action = ['+', arr.indexOf('+')];
      } else if (arr.includes('-')) {
        Action = ['-', arr.indexOf('-')];
      }
      let a = +arr[Action[1] - 1];
      let b = +arr[Action[1] + 1];

      let result = objectWithAction[Action[0]](a, b);
      arr.splice(Action[1] - 1, 3, result);
    }
    copyArr.splice(start, lengthOfSlice + 2, String(arr));
  }

  while (
    copyArr.includes('+') ||
    copyArr.includes('-') ||
    copyArr.includes('*') ||
    copyArr.includes('/')
  ) {
    let Action;
    if (copyArr.includes('*') && copyArr.includes('/')) {
      Action =
        copyArr.indexOf('*') < copyArr.indexOf('/')
          ? ['*', copyArr.indexOf('*')]
          : ['/', copyArr.indexOf('/')];
    } else if (copyArr.includes('*')) {
      Action = ['*', copyArr.indexOf('*')];
    } else if (copyArr.includes('/')) {
      Action = ['/', copyArr.indexOf('/')];
    } else if (copyArr.includes('+') && copyArr.includes('-')) {
      Action =
        copyArr.indexOf('+') < copyArr.indexOf('-')
          ? ['+', copyArr.indexOf('+')]
          : ['-', copyArr.indexOf('-')];
    } else if (copyArr.includes('+')) {
      Action = ['+', copyArr.indexOf('+')];
    } else if (copyArr.includes('-')) {
      Action = ['-', copyArr.indexOf('-')];
    }
    let a = +copyArr[Action[1] - 1];
    let b = +copyArr[Action[1] + 1];

    let result = objectWithAction[Action[0]](a, b);
    copyArr.splice(Action[1] - 1, 3, result);
  }

  return Number(copyArr);
}

module.exports = {
  expressionCalculator
};
