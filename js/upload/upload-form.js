import {HashtagValidator} from './hashtag-validator.js';
import {rules} from './validation-rules.js';
import {isEscPressed} from '../util.js';
import {Scale} from './editing/scale.js';


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

  //#region Управление событиями
  /**
   * Добавляет обработчики событий формы
   */
  addOpenEventListener() {
    this.inputs.fileInput.addEventListener('change', this.onImageUpload);
  }

  addEventListeners() {
    this.form.addEventListener('submit', this.onSubmit);
    this.inputs.description.addEventListener('input', this.onDescriptionInput);
    this.interface.closeBtn.addEventListener('click', this.onClose);
    document.addEventListener('keydown', this.onFormKeydown);
  }

  removeEventListeners() {
    this.form.removeEventListener('submit', this.onSubmit);
    this.inputs.description.addEventListener('input', this.onDescriptionInput);
    this.interface.closeBtn.removeEventListener('click', this.onClose);
    document.removeEventListener('keydown', this.onFormKeydown);
  }
  //#endregion

  //#region Обработчики событий
  /**
   * Отображает форму, отрисовывает preview изображения и добавляет нужные обработчики событий
   */
  onImageUpload() {
    this.show();
    this.loadImagePreview();
    this.addEventListeners();
  }

  /**
   * Прячет интерфейс формы и сбрасывает значение поля ввода изображения
   */
  onClose() {
    this.hide();
    this.removeEventListeners();
    this.resetFileInput();
  }

  /**
   * Обработчик события нажатия на клавижу в форме
   * @param {Event} evt Объект события
   */
  onFormKeydown(evt) {
    if (isEscPressed(evt) && document.activeElement !== this.inputs.description) {
      this.onClose();
    }
  }

  /**
   * Обработчик события изменения содержимого поля ввода описания изображания
   * @param {Event} evt объект события
   */
  onDescriptionInput(evt) {
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
    }
  }
  //#endregion

  /**
   * Отрисовывает интерфейс формы
   */
  show() {
    document.body.classList.add('modal-open');
    this.interface.overlay.classList.remove('hidden');
  }

  /**
   * Прячет интерфейс формы
   */
  hide() {
    this.interface.overlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }

  /**
   * Устанавливает предпросмотр загружаемого изображения
   */
  loadImagePreview() {
    this.interface.preview.src = URL.createObjectURL(this.inputs.fileInput.files[0]);
  }

  /**
   * Сбрасывает значение поля ввода загрузки изображения
   */
  resetFileInput() {
    this.inputs.fileInput.value = '';
  }

  /**
   * Проверяет форму на валидность
   * @returns {Boolean} Форма валидна
   */
  validate() {
    if (!this.validator) {
      this.validator = new HashtagValidator(this.form, this.inputs.hashtagsInput, rules);
    }
    return this.validator.validate();
  }


  /**
   * Устанавливает поле объекта с полями ввода
   */
  _setInputs() {
    this.inputs = {
      hashtagsInput: this.form.querySelector('.text__hashtags'),
      description: this.form.querySelector('.text__description'),
      fileInput: this.form.querySelector('#upload-file')
    };
    new Scale(this.form, this.interface.preview).addEventListeners();
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
    this.onImageUpload = this.onImageUpload.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onFormKeydown = this.onFormKeydown.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDescriptionInput = this.onDescriptionInput.bind(this);
  }
}


export {UploadForm};
