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
    this.onFilterChange = this.onFilterChange.bind(this);
    // this.clean = this.clean.bind(this);
    // this.show = this.show.bind(this);
  }

  /**
   * Добавляет обработчики событий для миниатюр
   */
  addEventListeners() {
    this.parent.addEventListener('click', this.onPreviewClick);
    document.addEventListener('filterChange', this.onFilterChange);
  }

  onFilterChange(evt) {
    this.show(evt.detail.postFilterFunction(this.posts));
  }

  /**
   * Отрисовывает миниатюры постов в элементе с классом `pictures`
   */
  show(posts) {
    this.tryClean(posts);
    const html = (posts ? posts : this.posts)
      .map((post) => previewTemplate.withInserted(post))
      .join('');
    this.parent.insertAdjacentHTML('beforeend', html);
  }

  tryClean(posts) {
    if (posts) {
      const preserve = [this.parent.children[0], this.parent.children[1]];
      this.parent.innerHTML = '';
      preserve.forEach((el) => this.parent.appendChild(el));
    }
  }

  /**
   * Устанавливает функцию обработчика нажатия на миниатюру
   * @param {(post: object) => void} onPreviewClick Функция обратного вызова (принимает пост для отрисовки)
   */
  setOnPreviewClick(onPreviewClick) {
    this.onPreviewClick = function(evt) {
      if (evt.target.classList.contains('picture__img')) {
        const postId = evt.target.parentElement.dataset.postId;
        const post = this.posts[this.indexById[postId]];

        onPreviewClick(post);
      }
    }.bind(this);
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
