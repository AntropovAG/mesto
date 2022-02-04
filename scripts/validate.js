const showInputError = (form, input, errorMessage) => {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.add('form__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active')
};

const hideInputError = (form, input) => {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.remove('form__input_type_error');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('form__save-button_inactive');
    buttonElement.style.pointerEvents = 'none';
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove('form__save-button_inactive');
    buttonElement.style.pointerEvents = 'auto';
    buttonElement.removeAttribute('disabled')
  }
};

const isValid = (form, input) => {
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage);
  } else {
    hideInputError(form, input);
  }
};


const setEventListeners = (form) => {

  const inputList = Array.from(form.querySelectorAll('.form__input'));
  const buttonElement = form.querySelector('.form__save-button');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(form, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};



// const enableValidation = () => {
//   const formList = Array.from(document.querySelectorAll('.form'));
//   formList.forEach((form) => {
//     form.addEventListener('submit', (evt) => {
//       evt.preventDefault();
//     });
//     setEventListeners(form);
//   });
// };

// enableValidation();

const enableValidation = (form) => {
  form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(form);
  }
