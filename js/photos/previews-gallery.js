import {previewTemplate} from '../templates/preview-template.js';


/**
 * Класс, отвечающий за миниатюры постов
 */
class PreviewsGallery {
  /**
   * @param {object[]} posts Посты для отрисовки
   */
  constructor(posts) {
    this.posts = posts;
    this.parent = document.querySelector('.pictures');
    this._setPostIndexes();
  }

  /**
   * Добавляет обработчики событий для миниатюр
   */
  addEventListeners() {
    this.parent.addEventListener('click', this.onClick);
  }

  /**
   * Устанавливает функцию обработчика нажатия на миниатюру
   * @param {(post: object) => void} onPreviewClick Функция обратного вызова (принимает пост для отрисовки)
   */
  setOnPreviewClick(onPreviewClick) {
    this.onClick = function(evt) {
      if (evt.target.classList.contains('picture__img')) {
        const postId = evt.target.parentElement.dataset.postId;
        const post = this.posts[this.indexById[postId]];

        onPreviewClick(post);
      }
    }.bind(this);
  }

  /**
   * Отрисовывает миниатюры постов в элементе с классом `pictures`
   */
  show() {
    this.parent.innerHTML += this.getPreviewsHTML();
  }

  /**
   * Создает HTML миниатюр постов
   */
  getPreviewsHTML() {
    let html = '';
    this.posts.forEach((post) => {
      html += previewTemplate.withInserted(post);
    });
    return html;
  }


  /**
   * Создает словарь для соотнесения id поста и индекса в DOM
   */
  _setPostIndexes() {
    this.indexById = {};
    this.posts.forEach((post, index) => {
      this.indexById[post.id] = index;
    });
  }
}


export {PreviewsGallery};
