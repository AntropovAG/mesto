//Объект для валидации
export const formValidationObject = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
}

// Переменные для формы с профилем
const profileFormSelector = '.popup_type_edit-profile';
const popUpProfileEdit = document.querySelector(profileFormSelector);
const profileEditForm = popUpProfileEdit.querySelector('.form');
const nameInput = profileEditForm.querySelector('#username-input');
const jobInput = profileEditForm.querySelector('#occupation-input');

//Переменные для формы с местом
const profilePlaceSelector = '.popup_type_element-add';
const popUpElementAdd = document.querySelector(profilePlaceSelector);
const placeAddForm = popUpElementAdd.querySelector('.form');

//Переменные со страницы
const profileEditButton = document.querySelector('.profile__edit-button');
const elementAddButton = document.querySelector('.profile__add-button');
const templateSelector = '#element_template';
const containerSelector = '.elements';

export {profileFormSelector,
        profileEditForm,
        nameInput,
        jobInput,
        profilePlaceSelector,
        placeAddForm,
        profileEditButton,
        elementAddButton,
        templateSelector,
        containerSelector,
}
