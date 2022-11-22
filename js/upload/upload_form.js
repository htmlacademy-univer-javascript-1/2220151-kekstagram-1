import {Validator} from './validation.js';
import {rules} from './validation_rules.js';
import {isEscape} from '../util.js';


/**
 * Класс формы загрузки изображения
 */
class UploadForm {
  constructor() {
    this.form = document.querySelector('.img-upload__form');
    this._setInterface();
    this._setInputs();
    this._bindMethods();
  }

  /**
   * Добавляет обработчики событий формы
   */
  addEventListeners() {
    this.inputs.fileInput.addEventListener('change', this.show);
    this.interface.closeBtn.addEventListener('click', this.reset);
  }

  /**
   * Проверяет форму на валидность
   * @returns {Boolean} Форма валидна
   */
  validate() {
    if (this.validator === undefined) {
      this.validator = new Validator(this.form, this.inputs);
      this.validator.setHashtagRules(rules);
    }
    return this.validator.validate();
  }

  /**
   * Обработчик события нажатия на клавижу в форме
   * @param {Event} evt Объект события
   */
  onFormKeyDown(evt) {
    if (isEscape(evt) && document.activeElement !== this.inputs.description) {
      this.reset();
    }
  }

  /**
   * Обработчик события изменения содержимого поля ввода описания изображания
   * @param {Event} evt объект события
   */
  onDescriptionChange(evt) {
    const length = evt.target.value.length;
    this.interface.descriptionLength.textContent = `${length}/140`;
  }

  /**
   * Обработчик события отправки формы
   * @param {Event} evt Объект события
   */
  onSubmit(evt) {
    const isValid = this.validate();

    if (!isValid) {
      evt.preventDefault();
    } else {
      this.hide();
    }
  }

  /**
   * Отображает форму, отрисовывает preview изображения и добавляет нужные обработчики событий
   */
  show() {
    document.body.classList.add('modal-open');
    this.interface.overlay.classList.remove('hidden');

    this.form.addEventListener('submit', this.onSubmit);
    document.addEventListener('keydown', this.onFormKeyDown);
    this.inputs.description.addEventListener('input', this.onDescriptionChange);

    const src = URL.createObjectURL(this.inputs.fileInput.files[0]);
    this.interface.preview.src = src;
  }

  /**
   * Прячет интерфейс формы
   */
  hide() {
    this.interface.overlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    this.form.removeEventListener('submit', this.onSubmit);
    document.removeEventListener('keydown', this.onFormKeyDown);
  }

  /**
   * Прячет интерфейс формы и сбрасывает значение поля ввода изображения
   */
  reset() {
    this.hide();
    this.inputs.fileInput.value = '';
  }


  /**
   * Устанавливает поле объекта с полями ввода
   */
  _setInputs() {
    this.inputs = {
      hashtags: this.form.querySelector('.text__hashtags'),
      description: this.form.querySelector('.text__description'),
      fileInput: this.form.querySelector('#upload-file'),
    };
  }

  /**
   * Устанавливает поле объекта с необходимыми элементами интерфейса
   */
  _setInterface() {
    this.interface = {
      overlay: this.form.querySelector('.img-upload__overlay'),
      closeBtn: this.form.querySelector('#upload-cancel'),
      preview: this.form.querySelector('.img-upload__preview > img'),
      descriptionLength: this.form.querySelector('.text__description-length')
    };
  }

  /**
   * Привязывает контексты методов к объекту данного класса
   */
  _bindMethods() {
    this.show = this.show.bind(this);
    this.reset = this.reset.bind(this);
    this.onFormSubmit = this.onSubmit.bind(this);
    this.onFormKeyDown = this.onFormKeyDown.bind(this);
    this.validate = this.validate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
  }
}


export {UploadForm};
