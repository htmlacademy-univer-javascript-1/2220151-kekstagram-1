/**
 * Разделяет текст на отдельные слова пробелами (несколько пробелов подряд игнорируются)
 * @param {String} text Текст для разбиения
 * @returns {String[]} Массив слов из текста
 */
const getHashtags = (text) => text.toLowerCase().split(' ').filter((s) => s);


/**
 * Базовый класс правила валидации
 */
class ValidationRule {
  /**
   * @param {String} message Сообщение об ошибке при проверке правила
   */
  constructor(message) {
    this.message = message;
  }

  /**
   * Добавляет функцию для проверки валидности текста
   * @param {(text: String) => Boolean} test Функция проверки валидности
   * @returns {ValidationRule} `this`
   */
  addTest(test) {
    this.test = test;
    return this;
  }
}


/**
 * Класс правила валидации на регулярных выражениях
 */
class RegexValidationRule extends ValidationRule {
  /**
   * @param {String} message Сообщение об ошибке при проверке на соответствие правилу
   * @param {RegExp} re Регулярное выражение для проверки значения
   * @param {Boolean} each Флаг, нужно ли разделять значение пробелами
   */
  constructor(message, re, each=true) {
    super(message);
    this.re = re;
    this.each = each;
  }

  /**
   * Проверяет значение на соответствие правилу
   * @param {String} text Значение для проверки
   * @returns {Boolean} Значение соответствует правилу
   */
  test(text) {
    if (this.each) {
      return getHashtags(text).every(this.re.test.bind(this.re));
    }
    return this.re.test(text);
  }
}


/**
 * Проверяет, что все значения массива различны
 * @param {Array} arr Массив для проверки
 * @returns {Boolean} Все значения массива различны
 */
const areAllUnique = (arr) => arr.length === new Set(arr).size;


const rules = {
  startwithHashRule: new RegexValidationRule(
    'Хештег начинается с символа # (решётка)',
    /^#/
  ),
  noSpecialsRule: new RegexValidationRule(
    'Хештег не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.',
    /^#[\wа-яё]*$/
  ),
  noEmptyHashtagsRule: new RegexValidationRule(
    'Хештег не может быть пустым',
    /^#.+/
  ),
  notTooLongRule: new RegexValidationRule(
    'Максимальная длина хештега 20 символов, включая # (решетку)',
    /.{1,20}/
  ),
  notManyHashtagsRule: new RegexValidationRule(
    'Максимальное число хештегов - 5',
    /( *#[^\s]+){0,5}/,
    false
  ),
  noIdenticalHashtagsRule: new ValidationRule(
    'Один и тот же хештег не может быть использован дважды'
  ).addTest((text) => areAllUnique(getHashtags(text)))
};


export {rules};
