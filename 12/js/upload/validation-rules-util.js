/**
 * Разделяет текст на отдельные слова пробелами (несколько пробелов подряд игнорируются)
 * @param {String} text Текст для разбиения
 * @returns {String[]} Массив слов из текста
 */
const splitHashtags = (text) => text.toLowerCase().split(' ').filter((s) => s);


/**
 * Проверяет что хештеги в строке не повторяются
 * @param text Текст для проверки
 * @returns {boolean} Все хештеги уникальны
 */
const areUnique = (text) => {
  const hashtags = splitHashtags(text);
  return hashtags.length === new Set(hashtags).size;
};


export {splitHashtags, areUnique};
