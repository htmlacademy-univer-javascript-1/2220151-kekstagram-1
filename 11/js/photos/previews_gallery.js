import {previewTemplate} from '../templates/preview_template.js';


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
  }

  /**
   * Отрисовывает миниатюры постов в элементе с классом `pictures`
   */
  show() {
    this.parent.innerHTML += this._getPreviewsHTML();
  }

  /**
   * Добавляет обработчики событий для миниатюр
   */
  addEventListeners() {
    this.parent.addEventListener('click', this.onClick);
  }

  /**
   * Удаляет обработчики событий миниатюр
   */
  removeEventListeners() {
    this.parent.removeEventListener('click', this.onClick);
  }

  /**
   * Устанавливает функцию обработчика нажатия на миниатюру
   * @param {(post: object) => void} onPreviewClick Функция обратного вызова (принимает пост для отрисовки)
   */
  setOnClick(onPreviewClick) {
    this.onClick = function(evt) {
      const postId = evt.target.parentElement.dataset.postId;
      const post = this.posts[this.indexById[postId]];

      onPreviewClick(post);
    }.bind(this);
  }

  /**
   * Создает словарь для соотнесения id поста и индекса в DOM
   */
  setPostIndecies() {
    this.indexById = {};
    this.posts.forEach((post, index) => {
      this.indexById[post.id] = index;
    });
  }


  /**
   * Создает HTML миниатюр постов
   */
  _getPreviewsHTML() {
    let html = '';
    this.posts.forEach((post) => {
      html += previewTemplate.withInserted(post);
    });
    return html;
  }
}


export {PreviewsGallery};
