import {createCommentsHtml} from './comments.js';
import {isEscape} from '../util.js';


/**
 * Класс, отвечающий за полноразмерное отображение постов
 */
class FullPost {
  constructor() {
    this._setDomFields();
    this._bindMethods();
    this.onLoaderClick = this.loadMoreComments;
  }

  /**
   * Вставляет данные о посте в соответствующие элементы
   * @param {object} post Пост для отображения
   */
  setData(post) {
    this.activePost = post;
    this.resetComments();
    this.loadMoreComments();
    this.elements.img.src = post.url;
    this.elements.likes.textContent = post.likes;
    this.elements.caption.textContent = post.description;
  }

  //#region Комментарии
  /**
   * Сбрасывает комментарии к пустому состоянию
   */
  resetComments() {
    this.activeCommentsTotalCount = this.activePost.comments.length;
    this.elements.commentsCount.textContent = this.activeCommentsTotalCount;
    this.elements.comments.innerHTML = '';
    this.loadedCommentsCount = 0;
  }

  /**
   * Показывает счетчик загруженных комментариев
   */
  showLoadedCommentsCount() {
    this.elements.loadedCommentsCount.nodeValue = `${this.loadedCommentsCount} из `;
  }

  /**
   * Возвращает комментарии от start до finish
   * @param {Number} start Стартовый индекс отображения
   * @param {Number} finish Конечный индекс отображения
   * @returns {object[]} Массив комментариев
   */
  getCommentsFromTo(start, finish) {
    return this.activePost.comments.slice(start, finish);
  }

  /**
   * Загружает дополнительные комментарии и обновляет счетчик
   */
  loadMoreComments() {
    const start = this.loadedCommentsCount;
    this.incrementLoadedCommentsCount();

    this.displayNewComments(start);
    this.showLoadedCommentsCount();
    this.tryHideLoadMore();
  }

  /**
   * Показывает новозагруженные комментарии
   * @param start Индекс последнего загруженного комментария до выполнения
   */
  displayNewComments(start) {
    this.elements.comments.innerHTML += createCommentsHtml(
      this.getCommentsFromTo(
        start,
        this.loadedCommentsCount));
  }

  /**
   * Увеличивает количество загруженных комментариев
   */
  incrementLoadedCommentsCount() {
    this.loadedCommentsCount = Math.min(
      this.loadedCommentsCount + 5,
      this.activeCommentsTotalCount);
  }

  /**
   * Скрывает кнопку загрузки комментариев при достижении конца списка комментариев
   */
  tryHideLoadMore() {
    if (this.loadedCommentsCount === this.activeCommentsTotalCount){
      this.elements.loadMoreBtn.classList.add('hidden');
      this.removeCommentLoaderEventListener();
    } else {
      this.elements.loadMoreBtn.classList.remove('hidden');
    }
  }
  //#endregion

  //#region Управление событиями
  /**
   * Добавляет обработчики событий нажатия на кнопку загрузки комментариев и закрытия
   */
  addEventListeners() {
    this.addCommentLoaderEventListener();
    this.addCloseEventListeners();
  }

  /**
   * Удаляет обработчики событий нажатия на кнопку загрузки комментариев и закрытия
   */
  removeEventListeners() {
    this.removeCommentLoaderEventListener();
    this.removeCloseEventListeners();
  }

  /**
   * Добавляет обработчик нажатия на кнопку загрузки комментариев
   */
  addCommentLoaderEventListener() {
    this.elements.loadMoreBtn.addEventListener('click', this.onLoaderClick);
  }

  /**
   * Удаляет обработчик нажатия на кнопку загрузки комментариев
   */
  removeCommentLoaderEventListener() {
    this.elements.loadMoreBtn.removeEventListener('click', this.onLoaderClick);
  }

  /**
   * Добавляет обработчик закрытия поста (крестик и Escape)
   */
  addCloseEventListeners() {
    this.elements.closeBtn.addEventListener('click', this.onClose);
    document.addEventListener('keydown', this.onClose);
  }

  /**
   * Удаляет обработчик закрытия поста (крестик и Escape)
   */
  removeCloseEventListeners() {
    this.elements.closeBtn.removeEventListener('click', this.onClose);
    document.removeEventListener('keydown', this.onClose);
  }
  //#endregion

  /**
   * Обработчик события закрытия полноразмерного отображения
   * @param {Event} evt Объект события
   */
  onClose(evt) {
    if (evt.target.id === 'picture-cancel' || isEscape(evt)) {
      this.bigPicture.classList.add('hidden');
      document.body.classList.remove('modal-open');

      this.removeEventListeners();
    }
  }

  /**
   * Отрисовывает пост в полноразмерном отображении
   */
  show() {
    this.bigPicture.classList.remove('hidden');
  }


  /**
   * Устанавливает значение необходимых полей из соответствующих DOM-элементов
   */
  _setDomFields() {
    const bigPicture = document.querySelector('.big-picture');
    this.bigPicture = bigPicture;

    this.elements = {
      img: bigPicture.querySelector('.big-picture__img img'),
      likes: bigPicture.querySelector('.likes-count'),
      commentsCount: bigPicture.querySelector('.comments-count'),
      comments: bigPicture.querySelector('.social__comments'),
      caption: bigPicture.querySelector('.social__caption'),
      closeBtn: bigPicture.querySelector('#picture-cancel'),
      loadedCommentsCount: bigPicture.querySelector('.social__comment-count').childNodes[0],
      loadMoreBtn: bigPicture.querySelector('.comments-loader')
    };
  }

  /**
   * Привязывает контексты методов к объекту данного класса
   */
  _bindMethods() {
    this.onClose = this.onClose.bind(this);
    this.loadMoreComments = this.loadMoreComments.bind(this);
  }
}


export {FullPost};
