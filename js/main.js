function getRandomBetween(from, to) {
  [from, to] = getIntRange(from, to);
  checkRange(from, to);

  return from + Math.floor(Math.random() * (to - from + 1));
}

function isNoLongerThan(text, maxLength) {
  return text.length <= maxLength;
}

function getIntRange(from, to) {
  return [Math.ceil(from), Math.floor(to)];
}

function checkRange(from, to) {
  if (from > to || from < 0) {
    throw new RangeError('Invalid Range');
  }
}


getRandomBetween(0, 42);
isNoLongerThan('keks', 4);
