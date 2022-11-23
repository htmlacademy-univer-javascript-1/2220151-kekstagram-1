import {commentTemplate} from '../templates/comment-template.js';


/**
 * Создает HTML элементов списка комментариев по посту
 * @param {object} comments Объект поста
 * @returns HTML-строка списка комментариев (без `<ul></ul>`)
 */
const createCommentsHtml = (comments) => {
  let html = '';
  for (const comment of comments) {
    html += commentTemplate.withInserted(comment);
  }
  return html;
};


export {createCommentsHtml};
