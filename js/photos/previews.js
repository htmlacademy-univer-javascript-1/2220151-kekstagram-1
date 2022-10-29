import {previewTemplate} from '../templates/preview_template.js';


/**
 * Возвращает HTML миниатюр постов
 * @param {object[]} posts Посты для отрисовки
 * @returns {String} HTML-строка
 */
const getPreviewsHTML = (posts) => {
  let html = '';
  for (const post of posts) {
    const previewHtml = previewTemplate.compile(post);
    html += previewHtml;
  }
  return html;
};

/**
 * Создает фрагмент с постами для отрисовки
 * @param {Object[]} posts Посты для отрисовки
 * @returns {DocumentFragment} Фрагмент с миниатюрами постов
 */
const createPreviews = (posts) => {
  const previews = document.createElement('template');
  previews.innerHTML = getPreviewsHTML(posts);
  return previews.content;
};

/**
 * Отрисовывает миниатюры постов в элементе с классом `pictures`
 * @param {Object[]} posts Посты для отрисовки
 */
const showPreviews = (posts) => {
  const parent = document.querySelector('.pictures');
  const previewsFragment = createPreviews(posts);
  parent.appendChild(previewsFragment);
};


export {showPreviews};
