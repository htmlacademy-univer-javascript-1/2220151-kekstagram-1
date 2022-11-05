import {createCommentsHtml} from './comments.js';


/**
 * Класс, отвечающий за полноразмерное отображение постов
 */
class FullPost {
  constructor(posts) {
    this._setDomFields();
    this.posts = posts;
  }

  /**
   * Обработчик события нажатия на миниатюру поста ~и прячет нужные элементы~
   * @param {*} evt Объект события
   * @param {*} indexById Словарь для получения индекса поста в `posts` по id нажатой миниатюры
   */
  onPreviewClick(evt, indexById) {
    this.toHide.forEach((e) => e.classList.add('hidden'));

    const postId = Number(evt.target.parentElement.dataset.postId);
    const post = this.posts[indexById[postId]];

    this._setData(post);

    this.element.classList.remove('hidden');
    document.body.classList.add('modal-open');
  }

  /**
   * Обработчик события закрытия полноразмерного отображения
   * @param {*} evt Объект события
   */
  onClose(evt) {
    if (evt.target.id === 'picture-cancel' || evt.key === 'Escape') {
      this.element.classList.add('hidden');
      document.body.classList.remove('modal-open');
    }
  }

  /**
   * Добавляет обработчик закрытия для кнопки закрытия
   */
  addCloseBtnEventListener() {
    this.closeBtn.onclick = this.onClose.bind(this);
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

  /**
   * Вставляет данные о посте в соответствующие элементы
   * @param {object} post Пост для отображения
   */
  _setData(post) {
    this.img.src = post.url;
    this.likes.textContent = post.likes;
    this.commentsCount.textContent = post.comments.length;
    this.comments.innerHTML = createCommentsHtml(post);
    this.caption.textContent = post.description;
  }
}


export {FullPost};
