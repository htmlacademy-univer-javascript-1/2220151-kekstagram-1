import {PreviewsGallery} from './previews_gallery.js';
import {FullPost} from './full_post.js';


/**
 * Класс, отвечающий за отображение и функционал галлереи постов
 */
class Gallery {
  constructor(posts) {
    this.posts = posts;
    this.previewGallery = new PreviewsGallery(posts);
    this.previewGallery.setPostIndecies();
    this.fullPost = new FullPost(posts);
  }

  /**
   * Добавляет миниатюры постов на страницу
   * @return {Gallery} `this`
   */
  show() {
    this.previewGallery.show();
    return this;
  }

  /**
   * Добавляет обработчики событий галлереи
   * @return {Gallery} `this`
   */
  addEventListeners() {
    this.previewGallery.setOnClick(this.onPreviewClick.bind(this));
    this.previewGallery.addEventListeners();
    return this;
  }

  /**
   * Обработчик события нажатия на миниатюру поста ~и прячет нужные элементы~
   * @param {object} post Пост
   */
  onPreviewClick(post) {
    this.fullPost.hideElements();

    this.fullPost.setData(post);

    this.fullPost.show();
    document.body.classList.add('modal-open');

    this.fullPost.addCloseEventListeners();
  }
}


export {Gallery};
