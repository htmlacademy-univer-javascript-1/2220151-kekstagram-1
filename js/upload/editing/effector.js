import {Effects} from './effects_enum.js';
import {EffectSlider} from './effect_slider.js';


/**
 * Класс эффектов изображения
 */
class Effector {
  /**
   * @param {HTMLFormElement} form форма, родитель управления масштабом
   * @param {HTMLImageElement} image Изображение для изменения масштаба
   */
  constructor(form, image) {
    this.select = form.querySelector('.effects__list');
    this.sliderElement = form.querySelector('.effect-level__slider');
    this.depthValueInput = form.querySelector('.effect-level__value');
    this.image = image;

    this.effectNoneButton = this.select.querySelector('#effect-none');
    this._bindMethods();
  }

  /**
   * Устанавливает обработчики событий, создает экземпляр слайдера, устанавливает эффект "Оригинал"
   */
  setup() {
    this.activeEffect = Effects['effect-none'];
    this.effectNoneButton.checked = true;

    this.slider = new EffectSlider(this.sliderElement, this.activeEffect).hide();

    this.select.addEventListener('change', this.onEffectSelect);
    this.slider.addEventListener('update', this.onSliderUpdate);
  }

  /**
   * Сбрасывает обработчики событий, удаляет слайдер
   */
  reset() {
    this.select.removeEventListener('change', this.onEffectSelect);
    this.slider.destroy();
  }

  /**
   * Обработчик события изменения выбранного эффекта
   * @param {Event} evt Объект события
   */
  onEffectSelect(evt) {
    const effect = Effects[evt.target.id];
    this.activeEffect = effect;

    this.updateEffect(effect);
  }

  /**
   * Обработчик события изменения значения слайдера
   */
  onSliderUpdate() {
    this.applyEffect(this.activeEffect);
    this.depthValueInput.defaultValue = this.slider.get().toString();
  }

  /**
   * Обновляет эффект и применяет к изображению, обновляет слайдер
   * @param effect Новый эффект применения
   */
  updateEffect(effect) {
    this.applyEffect(effect);
    this.slider.updateOptions(effect);
    this.tryHideSlider(effect);
  }

  /**
   * Применяет эффект к изображению
   * @param effect Эффект для применения
   */
  applyEffect(effect) {
    this.image.style.filter = effect.filterFunction
      ? `${effect.filterFunction}(${this.slider.get()}${effect.unit})`
      : '';
  }

  /**
   * Скрывает слайдер, когда выбран эффект "Оригинал"
   * @param effect Выбранный эффект
   */
  tryHideSlider(effect) {
    if (!effect.filterFunction) {
      this.slider.hide();
    } else {
      this.slider.show();
    }
  }


  /**
   * Привязывает контексты методов к объекту данного класса
   */
  _bindMethods() {
    this.applyEffect = this.applyEffect.bind(this);
    this.onEffectSelect = this.onEffectSelect.bind(this);
    this.onSliderUpdate = this.onSliderUpdate.bind(this);
  }
}

export {Effector};
