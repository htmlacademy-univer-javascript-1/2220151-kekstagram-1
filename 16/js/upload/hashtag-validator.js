const PRISTINE_CONFIG = {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'form-error',
};


/**
 * Класс валидатора формы загрузки изображения
 */
class HashtagValidator {
  /**
   * @param {Node} form Форма для валидации
   * @param {Node} hashtagsInput Поле ввода хештегов формы
   * @param {ValidationRule[]} rules Список правил для проверки
   */
  constructor(form, hashtagsInput, rules) {
    this.pristine = new Pristine(form, PRISTINE_CONFIG);
    this.hashtagsInput = hashtagsInput;
    this.setHashtagRules(rules);
  }

  /**
   * Добавляет валидаторы проверки по массиву правил
   * @param {ValidationRule[]} rules Список правил для проверки
   */
  setHashtagRules(rules) {
    rules.forEach((rule) => this.addHashtagsValidator(rule));
  }

  /**
   * Добавляет валидатор поля ввода хештегов на основе объекта правила rule
   * @param {ValidationRule} rule Правило для проверки
   */
  addHashtagsValidator(rule) {
    this.pristine.addValidator(
      this.hashtagsInput,
      rule.test.bind(rule),
      rule.message
    );
  }

  /**
   * Проверяет валидность формы
   * @returns {Boolean} Форма валидна
   */
  validate() {
    return this.pristine.validate();
  }
}


export {HashtagValidator};

