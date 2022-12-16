import {getRandomBetween, getShuffled, getRange, getRandomItem} from './data-util.js';
import {POST_COUNT, MIN_LIKES, MAX_LIKES, MAX_COMMENTS, POSITIVE_COMMENTS, NEGATIVE_COMMENTS, DESCRIPTIONS, NAMES} from './data-consts.js';


/**
 * Возвращает перемешанные ряды с уникальными идентификаторами постов, номерами фотографий, и идентификаторами комментариев
 * @returns {Number[][]} Случайные: id постов, индексы url фотографий, id комментариев
 */
const getRandomRanges = () => [
  getShuffled(getRange(1, POST_COUNT)), // id indexes
  getShuffled(getRange(1, POST_COUNT)), // img url indexes
  getShuffled(getRange(1, POST_COUNT * MAX_COMMENTS)) // comment id indexes
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
  const commentsCount = getRandomBetween(0, MAX_COMMENTS);
  for (let i = 0; i < commentsCount; ++i) {
    comments[i] = createComment(commentIds, postIndex * MAX_COMMENTS + i);
  }
  return comments;
};

/**
 * Создает посты со случайными идентификаторами, изображениями, описаниями, комментариями, количеством лайков
 * @param {Number[]} ids Доступные идентификаторы постов
 * @param {Number[]} imageNumbers Доступные номера изображений
 * @param {Number[]} commentIds Доступные идентификаторы комментариев
 * @returns {{id: Number, url: String, description: String, likes: Number, comments: object[]}[]} Список постов
 */
const createPosts = (ids, imageNumbers, commentIds) => {
  const posts = [];
  for (let i = 0; i < POST_COUNT; ++i) {
    posts[i] = {
      id: ids[i],
      url: `photos/${imageNumbers[i]}.jpg`,
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
  const [ids, imageNumbers, commentIds] = getRandomRanges();

  return createPosts(ids, imageNumbers, commentIds);
};


export {getPosts};
