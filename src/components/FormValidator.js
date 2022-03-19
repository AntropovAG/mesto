export default class FormValidator {
  constructor (validationObject, form) {
    this._form = form;
    this._formSelector = validationObject.formSelector;
    this._inputSelector = validationObject.inputSelector;
    this._submitButtonSelector = validationObject.submitButtonSelector;
    this._inactiveButtonClass = validationObject.inactiveButtonClass;
    this._inputErrorClass = validationObject.inputErrorClass;
    this._errorClass = validationObject.errorClass;
  }
  _showInputError (input, errorMessage) {
    const errorElement = this._form.querySelector(`.${input.id}-error`);
    input.classList.add(this._errorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass)
  };

  _hideInputError (input) {
    const errorElement = this._form.querySelector(`.${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  _hasInvalidInput () {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  _toggleButtonState () {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', true);
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled')
    }
  };

  _checkInputValidity (input) {
    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    }
  };

  _setEventListeners () {
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._buttonElement = this._form.querySelector(this._submitButtonSelector);
    this._toggleButtonState();
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  };

  clearValidationErrorAtOpen (){
    this._inputList.forEach((input) => {
      this._hideInputError (input)});
    this._toggleButtonState();
  }

  enableValidation () {
    this._setEventListeners()};
}

