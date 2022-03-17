import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popUpSelector, submitForm) {
    super(popUpSelector);
    this._submitForm = submitForm;
    this._inputList = this._popUp.querySelectorAll('.form__input');
    this._form = this._popUp.querySelector('.form')
  }

  _getInputValues() {
    this._inputsValue = {};
    this._inputList.forEach(input => {
      this._inputsValue[input.name] = input.value
    })

    return this._inputsValue
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
      this.close()
    })
  }

  close() {
    super.close();
    this._form.reset()
  }
}
