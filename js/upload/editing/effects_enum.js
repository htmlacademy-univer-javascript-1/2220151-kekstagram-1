/**
 * Функция-конструктор эффекта изображения
 * @param {String} filterFunction Название CSS-функции для обработки изображения
 * @param {Object} params Параметры фильтра
 * @param {Number} params.min Минимальное значение параметра функции
 * @param {Number} params.max Максимальное значение параметра функции
 * @param {Number} params.step Шаг изменения значения параметра функции
 * @param {String} params.unit Единица измерения параметра функции
 * @returns {Effect} Эффект
 * @constructor
 */
function Effect(filterFunction, {min=0, max=1, step=0.1, unit=''} = {}) {
  this.filterFunction = filterFunction;
  this.range = {
    min: min,
    max: max
  };
  this.step = step;
  this.unit = unit;

  this.start = max;

  return this;
}


const Effects = {
  'effect-none': new Effect(
    ''
  ),
  'effect-chrome': new Effect(
    'grayscale'
  ),
  'effect-sepia': new Effect(
    'sepia'
  ),
  'effect-marvin': new Effect(
    'invert',
    {
      max: 100,
      step: 1,
      unit: '%'
    }
  ),
  'effect-phobos': new Effect(
    'blur',
    {
      max: 3,
      unit: 'px'
    }
  ),
  'effect-heat': new Effect(
    'brightness',
    {
      min: 1,
      max: 3,
    }
  )
};


export {Effects};
