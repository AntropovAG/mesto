import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popUpSelector, handleSubmit) {
    super(popUpSelector);
    this._inputList = this._popUp.querySelectorAll('.form__input');
    this._form = this._popUp.querySelector('.form');
    this._handleSubmit = handleSubmit
  }

  _getInputValues() {
    const inputsValue = {};
    this._inputList.forEach(input => {
      inputsValue[input.name] = input.value
    })

    return inputsValue
  }

  changeHandleSubmit(newHandleSubmit) {
    this._handleSubmit = newHandleSubmit
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._getInputValues());
    })
  }

  close() {
    super.close();
    this._form.reset()
  }
}
