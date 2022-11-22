import {commentTemplate} from '../templates/comment_template.js';


/**
 * Создает HTML элементов списка комментариев по посту
 * @param {object} post Объект поста
 * @returns HTML-строка списка комментариев без `<ul></ul>`
 */
const createCommentsHtml = (post) => {
  let html = '';
  for (const comment of post.comments) {
    html += commentTemplate.withInserted(comment);
  }
  return html;
};


export {createCommentsHtml};
