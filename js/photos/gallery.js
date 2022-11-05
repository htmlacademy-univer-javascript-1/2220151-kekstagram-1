import {PreviewGallery} from './previews.js';
import {FullPost} from './full_post.js';


/**
 * Класс, отвечающий за отображение и функционал галлереи постов
 */
class Gallery {
  constructor(posts) {
    this.posts = posts;
    this.previewGallery = new PreviewGallery(posts);
    this.fullPost = new FullPost(posts);
  }

  /**
   * Добавляет миниатюры постов на страницу
   * @return {Gallery} `this`
   */
  show() {
    this.previewGallery.addPreviewsToPage();
    return this;
  }

  /**
   * Добавляет обработчики событий галлереи
   * @return {Gallery} `this`
   */
  addEventListeners() {
    this.previewGallery.addEventListeners(this.fullPost.onPreviewClick, this.fullPost);
    this.fullPost.addCloseBtnEventListener();
    window.addEventListener('keydown', this.fullPost.onClose.bind(this.fullPost));
    return this;
  }
}


export {Gallery};
