import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popUpSelector) {
    super(popUpSelector);
    this._form = this._popUp.querySelector('.form');
    this._button = this._form.querySelector('.form__save-button');
  }

  changeHandleSubmit(newHandleSubmit) {
    this._handleSubmit = newHandleSubmit
  }

  changeButtonTextToLoading(text) {
    this._button.textContent = text;
    this._button.style['pointer-events'] = 'none'
  }

  changeButtonTextToDefault(text) {
    this._button.textContent = text;
    this._button.style['pointer-events'] = ''
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmit()
    });
  }

}
