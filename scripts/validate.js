const validationObject = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
}

function showInputError (form, input, errorMessage) {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.add(validationObject['inputErrorClass']);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationObject['errorClass'])
};

function hideInputError (form, input) {
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

function toggleButtonState (inputList, buttonElement) {
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

function checkInputValidity (form, input) {
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage);
  } else {
    hideInputError(form, input);
  }
};

function setEventListeners (form) {
  const inputList = Array.from(form.querySelectorAll(validationObject['inputSelector']));
  const buttonElement = form.querySelector(validationObject['submitButtonSelector']);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      checkInputValidity(form, input);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

function enableValidation (validationObject) {
  const formList = Array.from(document.querySelectorAll(validationObject['formSelector']));
  formList.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(form);
  });
};

enableValidation(validationObject);

function clearValidationErrorAtOpen (form){
  const buttonElement = form.querySelector(validationObject['submitButtonSelector']);
  const inputList = Array.from(form.querySelectorAll(validationObject['inputSelector']));
  inputList.forEach((input) => {
    const errorElement = form.querySelector(`.${input.id}-error`);
    input.classList.remove(validationObject['inputErrorClass']);
    errorElement.classList.remove(validationObject['errorClass']);
    errorElement.textContent = '';
    });
  toggleButtonState(inputList, buttonElement);
}
