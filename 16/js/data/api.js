import {Popup} from '../popup.js';


const BASE_URL = 'https://26.javascript.pages.academy/kekstagram';


/**
 * В зависимости от статуса ответа вызывает соответствующую функцию и возвращает результат выполнения
 * @param {Response} res Объект ответа запроса
 * @param {(Response) => Object} onSuccess Функция, вызванная при успешном запросе
 * @param {(Response) => Object|undefined} onFail Функция вызванная при неуспешном запросе
 */
const callByStatus = (res, onSuccess, onFail) => res.ok ? onSuccess(res) : onFail(res);


/**
 * Отправляет запрос и возвращает значение обработанное в зависимости от успешности результата
 * @param {String} method Метод запроса
 * @param {FormData} body Тело запроса
 * @param {(Response) => Object} onSuccess Функция, вызванная при успешном запросе
 * @param {(Response) => Object|undefined} onFail Функция вызванная при неуспешном запросе
 * @returns {Promise<Object | undefined>} Результат запроса после обработки функцией соответствующей успешености
 */
const sendRequest = async (method, body, onSuccess, onFail) => {
  const url = `${BASE_URL}${method === 'GET' ? '/data' : ''}`;
  return fetch(url, {method: method, body: body})
    .then((res) => callByStatus(res, onSuccess, onFail));
};


/**
 * Парсит результат запроса как JSON
 * @param {Response} res Результат запроса
 * @return {any}
 */
const getJson = (res) => res.json();


/**
 * Показывает попап с сообщением об ошибке
 * @param {Response} res Неуспешный результат выполнения запроса
 * @return {Boolean} `false`
 */
const displayRequestFail = (res) => {
  Popup.displayFail(`Ошибка ${res.status}`);
  return false;
};


/**
 * Показывает попап с сообщением о публиковании поста
 * @return {Boolean} `true`
 */
const displayPublishSuccess = () => {
  Popup.displaySuccess('Пост опубликован!');
  return true;
};


/**
 * Получает список постов для отображения после запроса
 * @returns {Promise<Object|undefined>} Список постов при успешном запросе или undefined при неуспешном
 */
const getPosts = () => sendRequest('GET', null, getJson, displayRequestFail);


/**
 *
 * @param data
 * @returns {Promise<Object|undefined>}
 */
const publishPost = (data) => sendRequest('POST', data, displayPublishSuccess, displayRequestFail);


export {getPosts, publishPost};
