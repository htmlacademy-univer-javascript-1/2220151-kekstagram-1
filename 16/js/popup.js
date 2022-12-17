import {setBodyModalOpen, removeBodyModalOpen, isEscPressed} from './util.js';


/**
 * Класс, отвечающий за отображение попапов
 */
class Popup {
  /**
   * Возвращает логическое значение, активен ли попап
   * @return {boolean} `true` - попап показан,
   *
   * `false` - попап скрыт
   */
  static get shown() {
    return Popup._shown;
  }

  constructor() {
    if (Popup._instance) {
      return Popup._instance;
    } else {
      Popup._instance = this;
    }
    Popup._setDomFields();
    Popup._shown = false;
  }

  //#region Управление событиями
  /**
   * Добавляет необходимые обработчики событий
   */
  static addEventListeners() {
    Popup.okButton.addEventListener('click', Popup.onOkButtonClick);
    document.addEventListener('keydown', Popup.onKeyDown);
    Popup.popupElement.addEventListener('click', Popup.onOverlayClick);
  }

  /**
   * Удаляет обработчики событий
   */
  static removeEventListeners() {
    Popup.okButton.removeEventListener('click', Popup.onOkButtonClick);
    document.removeEventListener('keydown', Popup.onKeyDown);
    Popup.popupElement.removeEventListener('click', Popup.onOverlayClick);
  }
  //#endregion

  //#region Обработчики событий
  /**
   * Обработчик события нажатия на клавижу в попапе
   * @param {Event} evt Объект события
   */
  static onKeyDown(evt) {
    if (isEscPressed(evt)) {
      Popup.hide();
      Popup.removeEventListeners();
    }
  }

  /**
   * Обработчик события нажатия на оверлей попапа
   * @param {Event} evt Объект события
   */
  static onOverlayClick(evt) {
    if (evt.target.classList.contains('overlay')) {
      Popup.hide();
      Popup.removeEventListeners();
    }
  }

  static onOkButtonClick() {
    Popup.hide();
    Popup.removeEventListeners();
  }
  //#endregion

  //#region Методы
  /**
   * Показывает попап с переданными данными
   * @param {String} popupType Тип попапа `good | bad`
   * @param {String} heading Заголовок попапа
   * @param {String} text Текст попапа
   */
  static display(popupType, heading, text) {
    Popup._shown = true;
    Popup.setDom(popupType, heading, text);
    setBodyModalOpen();
    Popup.addEventListeners();
  }

  /**
   * Показывает неуспешный попап
   * @param {String} text Текст попапа
   */
  static displayFail(text) {
    Popup.display('bad', 'Упс :(', text);
  }

  /**
   * Показывает успешный попап
   * @param {String} text Текст попапа
   */
  static displaySuccess(text) {
    Popup.display('good', 'Успешно!', text);
  }

  /**
   * Заполняет элементы DOM нужными данными
   * @param {String} popupType Тип попапа `good | bad`
   * @param {String} heading Заголовок попапа
   * @param {String} text Текст попапа
   */
  static setDom(popupType, heading, text) {
    Popup.wrapperElement.className = `popup__wrapper ${popupType}`;
    Popup.headingElement.innerText = heading;
    Popup.textElement.innerText = text;
    Popup.popupElement.classList.remove('hidden');
  }

  /**
   * Прячет попап
   */
  static hide() {
    Popup._shown = false;
    Popup.popupElement.classList.add('hidden');
    removeBodyModalOpen();
  }
  //#endregion


  //#region Приватные метаметоды
  /**
   * Устанавливает значение необходимых полей из соответствующих DOM-элементов
   */
  static _setDomFields() {
    Popup.popupElement = document.querySelector('.popup');
    Popup.wrapperElement = Popup.popupElement.querySelector('.popup__wrapper');
    Popup.headingElement = Popup.popupElement.querySelector('.popup__heading');
    Popup.textElement = Popup.popupElement.querySelector('.popup__text');
    Popup.okButton = Popup.popupElement.querySelector('.popup__ok');
  }
  //#endregion
}


new Popup();

export {Popup};
