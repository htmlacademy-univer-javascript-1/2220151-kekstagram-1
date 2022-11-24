const CURLY_BRACES_RE = /{{(.+)}}/;
const CURLY_BRACES_ALL_RE = new RegExp(CURLY_BRACES_RE, 'g');
const COMPLEX_PROPERTY_RE = /(.+)\.(.+)/;


/**
 * Класс, предоставляющий функциноал шаблонизатора, где шаблон представляет HTML-строку
 * с параметрами, обернутыми в `{{фигурные скобки}}`. Сложный параметр разделяется
 * точкой `{{object.property}}`.
 */
class Template {
  /**
   * @param {String} template Строка-шаблон
   */
  constructor(template) {
    this.template = template;
  }

  /**
   * Подставляет значения в создынный шаблон
   * @param {object} data объект с данными для подставления
   * @returns {String} HTML-строка с подставленными значениями
   */
  withInserted(data) {
    return this.template.replace(CURLY_BRACES_ALL_RE, this._replaceMatch(data));
  }

  /**
   * Возвращает callback `replacer` для использования в `String.prototype.replace(pattern, replacer)`
   * @param {object} data объект с данными для подставления
   * @returns {function(String):String} `replacer` возвращает по `match` значение одноименного параметра в `data`
   */
  _replaceMatch(data) {
    return (match) => {
      const keyName = match.match(CURLY_BRACES_RE)[1].trim();
      const property = keyName.match(COMPLEX_PROPERTY_RE);

      return property
        ? data[property[1]][property[2]]
        : data[keyName];
    };
  }
}

export {Template};
