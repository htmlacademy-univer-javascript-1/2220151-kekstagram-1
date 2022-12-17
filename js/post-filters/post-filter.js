import {debounce} from '../util.js';
import {getDefaultPosts, getShuffledPosts, getSortedPosts} from './filter-functions.js';


/**
 * Класс, представляющий режим фильтрования
 */
class FilterMode {
  constructor(element, cb) {
    this.element = element;
    this.callback = cb;
  }
}

/**
 * Класс отвечающий за фильтры постов
 */
class PostFilter {
  constructor() {
    this.filtersElement = document.querySelector('.img-filters');
    this.form = this.filtersElement.querySelector('.img-filters__form');
    this._setFilterFields();

    this._bind();
    this._debounceUpdate();
    this.addEventListeners();
  }

  /**
   * Добавляет необходимые обработчики событий
   */
  addEventListeners() {
    this.form.addEventListener('click', this.onFilterClick);
  }

  /**
   * Обработчик события нажатия на фильтры
   * @param {Event} evt объект события
   */
  onFilterClick(evt) {
    if (evt.target.tagName === 'BUTTON') {
      this.updateActive(evt);
      this.callPostsUpdate();
    }
  }

  /**
   * Обновляет активный фильтр
   * @param {Evt} evt Объект события `onFilterClick`
   */
  updateActive(evt) {
    this.active.element.className = 'img-filters__button';
    evt.target.classList.add('img-filters__button--active');
    this.active = this.filters[evt.target.id];
  }

  /**
   * Вызывает событие для обновления отображенных постов
   */
  callPostsUpdate() {
    document.dispatchEvent(new CustomEvent('filterChange', {detail: {postFilterFunction: this.active.callback}}));
  }

  /**
   * Показывает фильтры
   */
  show() {
    this.filtersElement.classList.remove('img-filters--inactive');
  }


  /**
   * Устанавливает поля с фильтрами
   */
  _setFilterFields() {
    this.filters = {
      'filter-default': new FilterMode(this.form.querySelector('#filter-default'), getDefaultPosts),
      'filter-random': new FilterMode(this.form.querySelector('#filter-random'), getShuffledPosts),
      'filter-discussed': new FilterMode(this.form.querySelector('#filter-discussed'), getSortedPosts),
    };
    this.active = this.filters['filter-default'];
  }

  /**
   * Привязывает контексты методам
   */
  _bind() {
    this.onFilterClick = this.onFilterClick.bind(this);
    this.callPostsUpdate = this.callPostsUpdate.bind(this);
  }

  /**
   * Добавляет функцию 'устранения дребезга' для обновления постов
   */
  _debounceUpdate() {
    this.callPostsUpdate = debounce(this.callPostsUpdate);
  }
}


export {PostFilter};
