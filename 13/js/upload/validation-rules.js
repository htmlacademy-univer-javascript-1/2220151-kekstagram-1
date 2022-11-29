import {splitHashtags, areUnique} from './validation-rules-util.js';


/**
 * Базовый класс правила валидации
 */
class ValidationRule {
  /**
   * @param {String} message Сообщение об ошибке при проверке правила
   * @param {(String) => Boolean} test Функция проверки значения поля ввода
   */
  constructor(message, test=null) {
    this.message = message;
    this.test = test ? test : this.test;
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
      return splitHashtags(text).every(this.re.test.bind(this.re));
    }
    return this.re.test(text);
  }
}


const rules = [
  new RegexValidationRule(
    'Хештег начинается с символа # (решётка)',
    /^#/
  ),
  new RegexValidationRule(
    'Хештег не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.',
    /^.[\wа-яё]*$/
  ),
  new RegexValidationRule(
    'Хештег не может быть пустым',
    /^(?!#$)/
  ),
  new RegexValidationRule(
    'Максимальная длина хештега 20 символов, включая # (решетку)',
    /^.{1,20}$/
  ),
  new RegexValidationRule(
    'Максимальное число хештегов - 5',
    /^( *\S+){0,5} *$/,
    false
  ),
  new ValidationRule(
    'Один и тот же хештег не может быть использован дважды',
    areUnique
  )
];


export {rules};
