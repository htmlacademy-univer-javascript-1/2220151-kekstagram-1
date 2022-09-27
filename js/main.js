const getIntRange = (from, to) => {
  return [Math.ceil(from), Math.floor(to)];
}

const checkRange = (from, to) => {
  if (from > to || from < 0) {
    throw new RangeError('Invalid Range');
  }
}

const getRandomBetween = (from, to) => {
  [from, to] = getIntRange(from, to);
  checkRange(from, to);

  return from + Math.floor(Math.random() * (to - from + 1));
}

const isNoLongerThan = (text, maxLength) => {
  return text.length <= maxLength;
}


getRandomBetween(0, 42);
isNoLongerThan('keks', 4);
