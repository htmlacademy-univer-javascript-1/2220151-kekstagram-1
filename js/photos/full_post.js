import {createCommentsHtml} from './comments.js';


/**
 * Класс, отвечающий за полноразмерное отображение постов
 */
class FullPost {
  constructor(posts) {
    this._setDomFields();
    this.posts = posts;

    this.onClose = this.onClose.bind(this);
  }

  /**
   * Вставляет данные о посте в соответствующие элементы
   * @param {object} post Пост для отображения
   */
  setData(post) {
    this.img.src = post.url;
    this.likes.textContent = post.likes;
    this.commentsCount.textContent = post.comments.length;
    this.comments.innerHTML = createCommentsHtml(post);
    this.caption.textContent = post.description;
  }

  /**
   * Обработчик события закрытия полноразмерного отображения
   * @param {Event} evt Объект события
   */
  onClose(evt) {
    if (evt.target.id === 'picture-cancel' || evt.key === 'Escape') {
      this.element.classList.add('hidden');
      document.body.classList.remove('modal-open');

      this.removeCloseEventListener();
    }
  }

  /**
   * Добавляет обработчик закрытия поста (крестик и Escape)
   */
  addCloseEventListeners() {
    this.closeBtn.addEventListener('click', this.onClose);
    document.addEventListener('keydown', this.onClose);
  }

  /**
   * Удаляет обработчик закрытия поста (крестик и Escape)
   */
  removeCloseEventListener() {
    this.closeBtn.removeEventListener('click', this.onClose);
    document.removeEventListener('keydown', this.onClose);
  }

  /**
   * ~Прячет необходимые элементы~
   */
  hideElements() {
    this.toHide.forEach((e) => e.classList.add('hidden'));
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

    this.img = bigPicture.querySelector('.big-picture__img img');
    this.likes = bigPicture.querySelector('.likes-count');
    this.commentsCount = bigPicture.querySelector('.comments-count');
    this.comments = bigPicture.querySelector('.social__comments');
    this.caption = bigPicture.querySelector('.social__caption');
    this.closeBtn = bigPicture.querySelector('#picture-cancel');

    this.toHide = [
      bigPicture.querySelector('.social__comment-count'),
      bigPicture.querySelector('.comments-loader')
    ];
  }


}


export {FullPost};
