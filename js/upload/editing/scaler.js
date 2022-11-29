const MIN = 25;
const MAX = 100;
const STEP = 25;
const START = 100;


/**
 * Класс управления масштабом изображения
 */
class Scaler {
  /**
   * @param {HTMLFormElement} form форма, родитель управления масштабом
   * @param {HTMLImageElement} image Изображение для изменения масштаба
   */
  constructor(form, image) {
    this.scaleValue = START;
    this.image = image;

    this._setDomFields(form);
    this._setMethods();

    this.checkScaleValue();
  }

  /**
   * Добавляет обработчики событий нажатия на кнопку загрузки комментариев и закрытия
   */
  addEventListeners() {
    this.bigger.addEventListener('click', this.onBiggerButtonClick);
    this.smaller.addEventListener('click', this.onSmallerButtonClick);
  }

  /**
   * Удаляет обработчики событий нажатия на кнопку загрузки комментариев и закрытия
   */
  removeEventListeners() {
    this.bigger.removeEventListener('click', this.onBiggerButtonClick);
    this.smaller.removeEventListener('click', this.onSmallerButtonClick);
  }

  /**
   * Каркас обработчика события нажатия на кнопку масштаба
   * @param {Boolean} bigger Флаг,
   */
  onButtonClick(bigger) {
    this.scaleValue += bigger ? STEP : -STEP;
    this.updateImage();
    this.valueDisplay.value = `${this.scaleValue}%`;
    this.checkScaleValue();
  }

  /**
   * Обновляет масштаб изображения в интерфейсе
   */
  updateImage() {
    this.image.style.transform = `scale(${this.scaleValue}%)`;
  }

  /**
   * Проверяет масштаб изображения на факт равенства минимуму или максимуму
   * и нужные блокирует кнопки по необходимости
   */
  checkScaleValue() {
    if (this.scaleValue === MAX) {
      this.disable(this.bigger);
      return;
    }
    if (this.scaleValue === MIN) {
      this.disable(this.smaller);
      return;
    }
    this.enableAll();
  }

  /**
   * Блокирует данную кнопку изменения масштаба
   * @param {HTMLButtonElement} btn Кнопка для блокировки
   */
  disable(btn) {
    btn.setAttribute('disabled', 'true');
  }

  /**
   * Разблокирует обе кнопки изменения масштаба
   */
  enableAll() {
    [this.bigger, this.smaller].forEach((btn) => btn.removeAttribute('disabled'));
  }


  /**
   * Инициализирует нужные поля объекта с элементами HTML
   * @param {HTMLElement} parent Родительский элемент элементов управления
   */
  _setDomFields(parent) {
    this.bigger = parent.querySelector('.scale__control--bigger');
    this.smaller = parent.querySelector('.scale__control--smaller');
    this.valueDisplay = parent.querySelector('.scale__control--value');
  }

  /**
   * Устанавливает нужные методы и привязывает им нужные контексты
   * @param {HTMLFormElement} uploadForm объект формы загрузки
   */
  _setMethods() {
    this.updateImage = this.updateImage.bind(this);
    this.onBiggerButtonClick = this.onButtonClick.bind(this, true);
    this.onSmallerButtonClick = this.onButtonClick.bind(this, false);
  }
}


export {Scaler};
