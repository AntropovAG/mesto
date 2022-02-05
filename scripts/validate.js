const formValidationObject = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
}

function showInputError (form, input, errorMessage, validationObject) {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.add(validationObject['inputErrorClass']);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationObject['errorClass'])
};

function hideInputError (form, input, validationObject) {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.remove(validationObject['inputErrorClass']);
  errorElement.classList.remove(validationObject['errorClass']);
  errorElement.textContent = '';
};

function hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

function toggleButtonState (inputList, buttonElement, validationObject) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationObject['inactiveButtonClass']);
    buttonElement.style.pointerEvents = 'none';
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(validationObject['inactiveButtonClass']);
    buttonElement.style.pointerEvents = 'auto';
    buttonElement.removeAttribute('disabled')
  }
};

function checkInputValidity (form, input, validationObject) {
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, validationObject);
  } else {
    hideInputError(form, input, validationObject);
  }
};

function setEventListeners (form, validationObject) {
  const inputList = Array.from(form.querySelectorAll(validationObject['inputSelector']));
  const buttonElement = form.querySelector(validationObject['submitButtonSelector']);
  toggleButtonState(inputList, buttonElement, validationObject);
  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      checkInputValidity(form, input, validationObject);
      toggleButtonState(inputList, buttonElement, validationObject);
    });
  });
};

function enableValidation (validationObject) {
  const formList = Array.from(document.querySelectorAll(validationObject['formSelector']));
  formList.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(form, validationObject);
  });
};

enableValidation(formValidationObject);

function clearValidationErrorAtOpen (form, validationObject){
  const buttonElement = form.querySelector(validationObject['submitButtonSelector']);
  const inputList = Array.from(form.querySelectorAll(validationObject['inputSelector']));
  inputList.forEach((input) => {
    const errorElement = form.querySelector(`.${input.id}-error`);
    input.classList.remove(validationObject['inputErrorClass']);
    errorElement.classList.remove(validationObject['errorClass']);
    errorElement.textContent = '';
    });
  toggleButtonState(inputList, buttonElement, validationObject);
}
