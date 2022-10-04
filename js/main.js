const POST_COUNT = 25;

const MIN_LIKES = 15;
const MAX_LIKES = 200;

const MAX_COMMENTS = 5;
const POSITIVE_COMMENTS = ['Всё отлично!'];
const NEGATIVE_COMMENTS = [
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTIONS = [
  'Чиллим на природе',
  'Это я на Марсе, сейчас дома уже',
  'Люблю понедельники',
  'Never Gonna Give You Up',
  '25 лет назад это было бы невозможно'
];

const NAMES = [
  'Владимир',
  'Виктор',
  'Юрий',
  'Николай',
  'Борис',
  'Анатолий'
];


function getRandomBetween(from, to) {
  [from, to] = getIntRange(from, to);
  checkRange(from, to);

  return from + Math.floor(Math.random() * (to - from + 1));
}

function getPosts() {
  const [ids, imgs, commentIds] = getRandomRanges();
  return createPosts(ids, imgs, commentIds);
}

function getRandomRanges() {
  return [
    shuffle(getRange(1, POST_COUNT)),
    shuffle(getRange(1, POST_COUNT)),
    shuffle(getRange(1, POST_COUNT * MAX_COMMENTS))
  ];
}

function createPosts(ids, imgs, commentIds) {
  const posts = [];
  for (let i = 0; i < POST_COUNT; ++i) {
    posts[i] = {
      id: ids[i],
      url: `photos/${imgs[i]}.jpg`,
      description: getRandomItem(DESCRIPTIONS),
      likes: getRandomBetween(MIN_LIKES, MAX_LIKES),
      comments: getComments(commentIds, i)
    };
  }
  return posts;
}

function getComments(commentIds, postIndex) {
  const comments = [];
  for (let i = 0; i < getRandomBetween(0, MAX_COMMENTS); ++i) {
    comments[i] = createComment(commentIds, postIndex * MAX_COMMENTS + i);
  }
  return comments;
}

function createComment(commentIds, index) {
  return {
    id: commentIds[index],
    avatar: `img/avatar-${getRandomBetween(1, 6)}`,
    message: createCommentMessage(),
    name: getRandomItem(NAMES)
  };
}

function createCommentMessage() {
  if (getRandomBetween(0, 1)) {
    return createMessageFrom(POSITIVE_COMMENTS);
  } else {
    return createMessageFrom(NEGATIVE_COMMENTS);
  }
}

function createMessageFrom(COMMENT_POOL) {
  const lineCount = Math.min(getRandomBetween(1, 2), COMMENT_POOL.length);

  return shuffle(COMMENT_POOL).slice(0, lineCount).join(' ');
}

function shuffle(array) {
  return [...array].sort(() => getRandomBetween(0, 1) - .5);
}

function getRandomItem(pool) {
  return pool[getRandomBetween(0, pool.length - 1)];
}

function getRange(from, to) {
  return Array.from({length: to - from + 1}, (_, num) => num + from);
}

function getIntRange(from, to) {
  return [Math.ceil(from), Math.floor(to)];
}

function checkRange(from, to) {
  if (from > to || from < 0) {
    throw new RangeError('Invalid Range');
  }
}

function isNoLongerThan(text, maxLength) {
  return text.length <= maxLength;
}


isNoLongerThan('keks', 4);
getPosts();
