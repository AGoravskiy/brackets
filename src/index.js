module.exports = function check(str, bracketsConfig) {
  const openingBrakets = bracketsConfig.reduce((res, brakets) => res + brakets[0], '');
  const closingBrakets = bracketsConfig.reduce((res, brakets) => res + brakets[1], '');

  let braketsStack = [];
  let lastBraket;

  for (let i = 0; i < str.length; i++) {
    if (openingBrakets.includes(str[i]) && closingBrakets.includes(str[i]) && lastBraket === str[i]) {
      braketsStack.pop();
      lastBraket = braketsStack.length > 0 ? braketsStack[braketsStack.length - 1] : undefined;
      continue;
    }
    if (openingBrakets.includes(str[i])) {
      braketsStack.push(str[i]);
      lastBraket = str[i];
    } else if (closingBrakets.includes(str[i])) {
      if (lastBraket) {
        if (openingBrakets.indexOf(lastBraket) === closingBrakets.indexOf(str[i])) {
          braketsStack.pop();
          lastBraket = braketsStack.length > 0 ? braketsStack[braketsStack.length - 1] : undefined;
        } 
      } else {
        return false;
      }
    }
  }

  return braketsStack.length === 0;
}
