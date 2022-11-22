import {getRandomBetween, getShuffled, getRange, getRandomItem} from './util.js';

const POST_COUNT = 25;

const MIN_LIKES = 15;
const MAX_LIKES = 200;

const MAX_COMMENTS = 20;
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


/**
 * Возвращает перемешанные ряды с уникальными идентификаторами постов, номерами фотографий, и идентификаторами комментариев
 * @returns {Number[][]} Случайные: id постов, индексы url фотографий, id комментариев
 */
const getRandomRanges = () => [
  getShuffled(getRange(1, POST_COUNT)), // id indecies
  getShuffled(getRange(1, POST_COUNT)), // img url indecies
  getShuffled(getRange(1, POST_COUNT * MAX_COMMENTS)) // comment id indecies
];

/**
 * Создает сообщение из одного или двух предложений из данного пула
 * @param {String[]} commentPool Пул сообщений
 * @returns {String} Сообщение
 */
const createMessageFrom = (commentPool) => {
  const lineCount = Math.min(getRandomBetween(1, 2), commentPool.length);

  return getShuffled(commentPool).slice(0, lineCount).join(' ');
};

/**
 * Создает случайное позитивное или негативное сообщение
 * @returns {String} Сообщение
 */
const createCommentMessage = () => createMessageFrom(getRandomBetween(0, 1) ? POSITIVE_COMMENTS : NEGATIVE_COMMENTS);

/**
 * Создает комментарий со случайными идентификатором, аватаром, текстом и именем
 * @param {Number[]} commentIds Все доступные идентификаторы комментариев
 * @param {Number} index Индекс данного комментария для данного поста
 * @returns {{id: Number, avatar: String, message: String, name: String}} Комментарий
 */
const createComment = (commentIds, index) => ({
  id: commentIds[index],
  avatar: `img/avatar-${getRandomBetween(1, 6)}.svg`,
  message: createCommentMessage(),
  name: getRandomItem(NAMES)
});

/**
 * Создает случайные комментарии для данного поста
 * @param {Number[]} commentIds Все доступные идентификаторы комментариев
 * @param {Number} postIndex Индекс данного поста
 * @returns {{id: Number, avatar: String, message: String, name: String}[]} Список комментариев
 */
const createComments = (commentIds, postIndex) => {
  const comments = [];
  for (let i = 0; i < getRandomBetween(0, MAX_COMMENTS); ++i) {
    comments[i] = createComment(commentIds, postIndex * MAX_COMMENTS + i);
  }
  return comments;
};

/**
 * Создает посты со случайными идентификаторами, изображениями, описаниями, комментариями, количеством лайков
 * @param {Number[]} ids
 * @param {Number[]} imgs
 * @param {Number[]} commentIds
 * @returns {{id: Number, url: String, description: String, likes: Number, comments: object[]}[]} Список постов
 */
const createPosts = (ids, imgs, commentIds) => {
  const posts = [];
  for (let i = 0; i < POST_COUNT; ++i) {
    posts[i] = {
      id: ids[i],
      url: `photos/${imgs[i]}.jpg`,
      description: getRandomItem(DESCRIPTIONS),
      likes: getRandomBetween(MIN_LIKES, MAX_LIKES),
      comments: createComments(commentIds, i)
    };
  }
  return posts;
};

/**
 * Возвращает коллекцию `POST_COUNT` сгенерированных постов
 * @returns {{id: Number, url: String, description: String, likes: Number, comments: object[]}[]} Список постов
 */
const getPosts = () => {
  const [ids, imgs, commentIds] = getRandomRanges();

  return createPosts(ids, imgs, commentIds);
};

export {getPosts};
