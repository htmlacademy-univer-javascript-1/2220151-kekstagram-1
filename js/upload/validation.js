/**
 * Класс валидатора формы загрузки изображения
 */
class Validator {
  /**
   * @param {Node} form Форма для валидации
   * @param {Node[]} inputs Поля ввода формы
   */
  constructor(form, inputs) {
    const PRISTINE_CONFIG = {
      classTo: 'img-upload__field-wrapper',
      errorTextParent: 'img-upload__field-wrapper',
      errorTextClass: 'form-error',
    };
    this.pristine = new Pristine(form, PRISTINE_CONFIG);
    this.inputs = inputs;
  }

  /**
   * Добавляет валидаторы проверки по массиву правил
   * @param {Rule[]} rules Правила для проверки
   */
  setHashtagRules(rules) {
    Object.values(rules).forEach(
      (rule) => this.addHashtagsValidator(rule));
  }

  /**
   * Добавляет валидатор поля ввода на основе объекта правила rule
   * @param {Node} element Поле ввода для проверки
   * @param {Rule} rule Правило для проверки
   */
  addValidator(element, rule) {
    this.pristine.addValidator(
      element,
      rule.test.bind(rule),
      rule.message
    );
  }

  /**
   * Добавляет валидатор поля ввода хештегов на основе объекта правила rule
   * @param {Rule} rule Правило для проверки
   */
  addHashtagsValidator(rule) {
    this.addValidator(this.inputs.hashtags, rule);
  }

  /**
   * Проверяет валидность формы
   * @returns {Boolean} Форма валидна
   */
  validate() {
    return this.pristine.validate();
  }
}


export {Validator};

