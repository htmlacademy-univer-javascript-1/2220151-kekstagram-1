import {commentTemplate} from '../templates/comment-template.js';


/**
 * Создает HTML элементов списка комментариев по посту
 * @param {object} comments Объект поста
 * @returns HTML-строка списка комментариев (без `<ul></ul>`)
 */
const createCommentsHtml = (comments) => comments
  .map((comment) => commentTemplate.withInserted(comment))
  .join('');


export {createCommentsHtml};
