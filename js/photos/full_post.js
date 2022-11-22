import {createCommentsHtml} from './comments.js';
import {isEscape} from '../util.js';


/**
 * Класс, отвечающий за полноразмерное отображение постов
 */
class FullPost {
  constructor(posts) {
    this._setDomFields();
    this.posts = posts;
    this.loadedCommentsCount = 0;

    this.onClose = this.onClose.bind(this);
    this.loadMoreComments = this.loadMoreComments.bind(this);
  }

  /**
   * Вставляет данные о посте в соответствующие элементы
   * @param {object} post Пост для отображения
   */
  setData(post) {
    this.activePost = post;
    this.activeCommentsTotalCount = post.comments.length;
    this.loadedCommentsCount = 0;

    this.showLoadedCommentsCount();
    this.tryHideLoadMore();
    this.elements.img.src = post.url;
    this.elements.likes.textContent = post.likes;
    this.elements.commentsCount.textContent = post.comments.length;
    this.elements.comments.innerHTML = '';
    this.elements.caption.textContent = post.description;
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

    this.loadedCommentsCount = Math.min(
      this.loadedCommentsCount + 5,
      this.activeCommentsTotalCount);

    this.elements.comments.innerHTML += createCommentsHtml(this.getCommentsFromTo(start, this.loadedCommentsCount));
    this.tryHideLoadMore();

    this.showLoadedCommentsCount();
  }

  /**
   * Скрывает кнопку загрузки комментариев при достижении конца списка комментариев
   */
  tryHideLoadMore() {
    if (this.loadedCommentsCount === this.activeCommentsTotalCount){
      this.elements.commentsloader.classList.add('hidden');
    } else {
      this.elements.commentsloader.classList.remove('hidden');
    }
  }

  /**
   * Обработчик события закрытия полноразмерного отображения
   * @param {Event} evt Объект события
   */
  onClose(evt) {
    if (evt.target.id === 'picture-cancel' || isEscape(evt)) {
      this.element.classList.add('hidden');
      document.body.classList.remove('modal-open');

      this.removeCloseEventListener();
      this.removeCommentLoaderEventListener();
    }
  }

  /**
   * Добавляет обработчик нажатия на кнопку загрузки комментариев
   */
  addCommentLoaderEventListener() {
    this.elements.commentsloader.addEventListener('click', this.loadMoreComments);
  }

  /**
   * Удаляет обработчик нажатия на кнопку загрузки комментариев
   */
  removeCommentLoaderEventListener() {
    this.elements.commentsloader.removeEventListener('click', this.loadMoreComments);
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
  removeCloseEventListener() {
    this.elements.closeBtn.removeEventListener('click', this.onClose);
    document.removeEventListener('keydown', this.onClose);
  }

  /**
   * Отрисовывает пост в полноразмерном отображении
   */
  show() {
    this.element.classList.remove('hidden');
  }


  /**
   * Устанавливает значение необходимых полей из соответствующих DOM-элементов
   */
  _setDomFields() {
    const bigPicture = document.querySelector('.big-picture');
    this.element = bigPicture;

    this.elements = {
      img: bigPicture.querySelector('.big-picture__img img'),
      likes: bigPicture.querySelector('.likes-count'),
      commentsCount: bigPicture.querySelector('.comments-count'),
      comments: bigPicture.querySelector('.social__comments'),
      caption: bigPicture.querySelector('.social__caption'),
      closeBtn: bigPicture.querySelector('#picture-cancel'),
      loadedCommentsCount: bigPicture.querySelector('.social__comment-count').childNodes[0],
      commentsloader: bigPicture.querySelector('.comments-loader')
    };
  }
}


export {FullPost};
