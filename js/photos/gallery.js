import {PreviewsGallery} from './previews-gallery.js';
import {FullPost} from './full-post.js';


/**
 * Класс, отвечающий за отображение и функционал галлереи постов
 */
class Gallery {
  constructor(posts) {
    this.previewGallery = new PreviewsGallery(posts);
    this.fullPost = new FullPost(posts);
  }

  /**
   * Добавляет обработчики событий галлереи
   * @return {Gallery} `this`
   */
  addEventListeners() {
    this.previewGallery.setOnPreviewClick(this.onPreviewClick.bind(this));
    this.previewGallery.addEventListeners();
    return this;
  }

  /**
   * Обработчик события нажатия на миниатюру поста ~и прячет нужные элементы~
   * @param {object} post Пост
   */
  onPreviewClick(post) {
    this.fullPost.setActivePost(post);

    this.fullPost.show();
    document.body.classList.add('modal-open');

    this.fullPost.addEventListeners();
  }

  /**
   * Добавляет миниатюры постов на страницу
   * @return {Gallery} `this`
   */
  show() {
    this.previewGallery.show();
    return this;
  }
}


export {Gallery};
