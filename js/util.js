/**
 * Возвращает минимальное и максимальное целые числа в отрезке
 * @param {Number} from Начало отрезка
 * @param {Number} to Конец отрезка
 * @returns {Number[]} Преобразованные границы отрезка
 */
const getIntRange = (from, to) => [Math.ceil(from), Math.floor(to)];

/**
 * Проверяет, что границы отрезка положительны и стоят в порядке возрастания
 * @param {Number} from Начало отрезка
 * @param {Number} to Конец отрезка
 * @throws {RangeError} Отрезок имеет отрицательную длину или содержит отрицательные целые числа
 */
const checkRange = (from, to) => {
  if (from > to || from < 0) {
    throw new RangeError('Invalid Range');
  }
};

/**
 * Возвращает случайное число из неотрицательного отрезка [`from`, `to`] (`from` <= `to`)
 * @param {Number} from Начало отрезка
 * @param {Number} to Конец отрезка
 * @throws {RangeError}, когда отрезок имеет отрицательную длину или содержит отрицательные целые числа
 * @returns {Number} Случайное число из отрезка [`from`, `to`]
 */
const getRandomBetween = (from, to) => {
  [from, to] = getIntRange(from, to);
  checkRange(from, to);

  return from + Math.floor(Math.random() * (to - from + 1));
};

/**
 * Проверяет максимальную длину строки
 * @param {String} text Строка для проверки
 * @param {Number} maxLength Максимальная подходящая длина
 * @returns {boolean} Строка не длиннее данной максимальной длины
 */
const isNoLongerThan = (text, maxLength) => text.length <= maxLength;

/**
 * Возвращает перемешанный массив
 * @param {Array} array Массив для перемешивания
 * @returns {Array} Перемешанный массив
 */
const getShuffled = (array) => [...array].sort(() => getRandomBetween(0, 1) - .5);

/**
 * Возвращает ряд чисел от `from` до `to` включительно в порядке возрастания
 * @param {Number} from
 * @param {Number} to
 * @returns {Number[]} Ряд чисел
 */
const getRange = (from, to) => Array.from({length: to - from + 1}, (_, num) => num + from);

/**
 * Возвращает случайный элемент из данной коллекции
 * @param {Array} pool Коллекция элементов
 * @returns Случайный элемент коллекции
 */
const getRandomItem = (pool) => pool[getRandomBetween(0, pool.length - 1)];

/**
 * Проверяет событие на факт нажатия на клавижу Escape
 * @param {Event} evt Объект события
 * @returns {Boolean} Событие является нажатием на клавишу Enter
 */
const isEscape = (evt) => evt.key === 'Escape';


export {getRandomBetween, getShuffled, isNoLongerThan, getRange, getRandomItem, isEscape};
