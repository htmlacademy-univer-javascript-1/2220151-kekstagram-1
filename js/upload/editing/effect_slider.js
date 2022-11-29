/**
 * Класс слайдера эффектов
 */
class EffectSlider {
  /**
   * @param {HTMLElement} sliderElement Элемент слайдера
   * @param {Effect} initialEffect Изначальный эффект
   */
  constructor(sliderElement, initialEffect) {
    noUiSlider.create(sliderElement, {
      ...initialEffect,
      connect: 'lower'
    });
    this.slider = sliderElement.noUiSlider;

    this._routeMethods();
  }

  /**
   * Показывает слайдер
   * @returns {EffectSlider} `this`
   */
  show() {
    this.slider.target.classList.remove('hidden');
    return this;
  }

  /**
   * Прячет слайдер
   * @returns {EffectSlider} `this`
   */
  hide() {
    this.slider.target.classList.add('hidden');
    return this;
  }

  /*
  /!**
   *
   * @param type
   * @param callback
   *!/
  addEventListener(type, callback) {
    this.slider.on(type, () => {
      callback();
      console.log(this.valueElement, this.valueElement.value, this.get());
      this.valueElement.value = this.get();
    });
  }*/


  /**
   * Перенаправляет методы с данного класса на экземпляр NoUiSlider
   */
  _routeMethods() {
    this.updateOptions = this.slider.updateOptions;
    this.addEventListener = this.slider.on;

    this.get = this.slider.get;
    this.destroy = this.slider.destroy;
  }
}


export {EffectSlider};
