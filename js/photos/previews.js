import {previewTemplate} from '../templates/preview_template.js';


/**
 * Класс, отвечающий за миниатюры постов
 */
class PreviewGallery {
  /**
   * @param {object[]} posts Посты для отрисовки
   */
  constructor(posts) {
    this.posts = posts;
  }

  /**
   * Отрисовывает миниатюры постов в элементе с классом `pictures`
   */
  addPreviewsToPage() {
    this.parent = document.querySelector('.pictures');
    this.parent.innerHTML += this._getPreviewsHTML();
    this._setPostIndecies();
  }

  /**
   * Добавляет обработчики событий для миниатюр
   * @param {Function} onPreviewClick Функция обратного вызова (принимает объект события и словарь соотнесения индексов и id)
   * @param {any} ctx контекст функуции `onPreviewClick`
   */
  addEventListeners(onPreviewClick, ctx) {
    const previews = this.parent.querySelectorAll('.picture');
    for (const preview of previews) {
      preview.addEventListener('click', (evt) =>
        onPreviewClick.call(ctx, evt, this.indexById));
    }
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

  /**
   * Создает словарь для соотнесения id поста и индекса в DOM
   */
  _setPostIndecies() {
    this.indexById = {};
    this.posts.forEach((post, index) => {
      this.indexById[post.id] = index;
    });
  }
}


export {PreviewGallery};
