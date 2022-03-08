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
const placeInput = placeAddForm.querySelector('#place-input');
const addressInput = placeAddForm.querySelector('#address-input')

//Переменные со страницы
const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation')
const openProfileEditButton = document.querySelector('.profile__edit-button');
const openElementAddButton = document.querySelector('.profile__add-button');
const popUpArray = Array.from(document.querySelectorAll('.popup'));

//Функции
//1. Открытие попапов
export function openPopUp (popup) {
  popup.classList.add('popup_opened');
  window.addEventListener('keydown', closePopUpOnEscKey);
};

function openProfileEditPopUp() {
  openPopUp(popUpProfileEdit);
  nameInput.value = profileName.textContent;
  jobInput.value = profileOccupation.textContent;
  validateProfileForm._clearValidationErrorAtOpen();
};

function openElementAddPopUp() {
  openPopUp(popUpElementAdd);
  placeInput.value = "";
  addressInput.value = "";
  validatePlaceForm._clearValidationErrorAtOpen();
};


//2. Закрытие попапов
function closePopUp (popup) {
  popup.classList.remove('popup_opened');
  window.removeEventListener('keydown', closePopUpOnEscKey);
};

function closeActivePopUps () {
  popUpArray.forEach((item) => {
  if (item.matches('.popup_opened')) {
    closePopUp(item)
  }
})}

function closePopUpOnEscKey (evt){
  if (evt.key === 'Escape') {
    closeActivePopUps();
}
}

//3. Отправка через формы
function submitProfileForm (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileOccupation.textContent =  jobInput.value;
  closeActivePopUps();
};

function submitPlaceAddForm (evt) {
  evt.preventDefault();
  const card = new Card(placeInput.value, addressInput.value);
  const cardElement = card.generateCard();
  document.querySelector('.elements').prepend(cardElement);
  closeActivePopUps();
};

//Добавление карточек
import {Card} from './Card.js';

initialCards.forEach((item) => {
  const card = new Card(item.name, item.link);
  const cardElement = card.generateCard();
  document.querySelector('.elements').prepend(cardElement);
});

//Кнопки/Слушатели
//1. Открытие
openProfileEditButton.addEventListener('click', openProfileEditPopUp);
openElementAddButton.addEventListener('click', openElementAddPopUp);

//2. Закрытие:
// //2.1 по кнопке и клику вне поля

popUpArray.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
      if (evt.target === evt.currentTarget) {
          closePopUp(evt.target)
      }
      if (evt.target.classList.contains('popup__close-button')) {
        closePopUp(popup)
      }
  })
})

//3. Отправка
profileEditForm.addEventListener('submit', submitProfileForm);
popUpElementAdd.addEventListener('submit', submitPlaceAddForm);

//Валидация форм
import {formValidationObject, FormValidator} from './FormValidator.js';

const validateProfileForm = new FormValidator(formValidationObject, profileFormSelector);
validateProfileForm.enableValidation();

const validatePlaceForm = new FormValidator(formValidationObject, profilePlaceSelector);
validatePlaceForm.enableValidation();
