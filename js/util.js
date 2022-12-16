/**
 * Проверяет максимальную длину строки
 * @param {String} text Строка для проверки
 * @param {Number} maxLength Максимальная подходящая длина
 * @returns {boolean} Строка не длиннее данной максимальной длины
 */
const isNoLongerThan = (text, maxLength) => text.length <= maxLength;

/**
 * Проверяет событие на факт нажатия на клавижу Escape
 * @param {Event} evt Объект события
 * @returns {Boolean} Событие является нажатием на клавишу Enter
 */
const isEscPressed = (evt) => evt.key === 'Escape';

/**
 * Добавляет класс `modal-open` элементу `body`
 */
const setBodyModalOpen = () => document.body.classList.add('modal-open');

/**
 * Удаляет класс `modal-open` у элемента `body`
 */
const removeBodyModalOpen = () => document.body.classList.add('modal-open');


export {isNoLongerThan, isEscPressed, setBodyModalOpen, removeBodyModalOpen};
