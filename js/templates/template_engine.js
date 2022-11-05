/**
 * Класс, предоставляющий функциноал шаблонизатора, где шаблон представляет HTML-строку
 * с параметрами, обернутыми в `{{фигурные скобки}}`. Сложный параметр разделяется
 * точкой `{{object.property}}`.
 */
class TemplateEngine {
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
    const curlyBracesRe = /{{(.+)}}/g;
    return this.template.replace(curlyBracesRe, this._replaceMatch(data));
  }

  /**
   * Возвращает callback `replacer` для использования в `String.prototype.replace(pattern, replacer)`
   * @param {object} data объект с данными для подставления
   * @returns {function(String):String} `replacer` возвращает по `match` значение одноименного параметра в `data`
   */
  _replaceMatch(data) {
    const replacer = (match) => {
      const keyName = match.match(/{{(.+)}}/)[1].trim();
      const property = keyName.match(/(.+)\.(.+)/);

      return property
        ? data[property[1]][property[2]]
        : data[keyName];
    };

    return replacer;
  }
}

export {TemplateEngine};
