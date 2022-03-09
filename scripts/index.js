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
const profileEditButton = document.querySelector('.profile__edit-button');
const elementAddButton = document.querySelector('.profile__add-button');
const popUpArray = Array.from(document.querySelectorAll('.popup'));
const templateSelector = '#element_template';
const elementsContainer = document.querySelector('.elements');
import {formValidationObject} from './constants.js';
import {initialCards} from './cards.js';
import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

//Функции
//1. Открытие попапов
export function openPopUp (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopUpOnEscKey);
};

function openProfileEditPopUp() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileOccupation.textContent;
  validateProfileForm.clearValidationErrorAtOpen();
  openPopUp(popUpProfileEdit);
};

function openElementAddPopUp() {
  placeInput.value = "";
  addressInput.value = "";
  validatePlaceForm.clearValidationErrorAtOpen();
  openPopUp(popUpElementAdd);
};


//2. Закрытие попапов
function closePopUp (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopUpOnEscKey);
};

function closeActivePopUp () {
const popup = document.querySelector('.popup_opened');
  if (popup) {
    closePopUp(popup);
  }
}

function closePopUpOnEscKey (evt){
  if (evt.key === 'Escape') {
    closeActivePopUp();
  }
}

//3. Отправка через формы
function submitProfileForm (evt) {
  evt.preventDefault();
  closeActivePopUp();
  profileName.textContent = nameInput.value;
  profileOccupation.textContent =  jobInput.value;
};

function createCard (name, link) {
  const card = new Card(name, link, templateSelector);
  const cardElement = card.generateCard();
  return cardElement;
}

function addCardPrepend (cardElement) {
  elementsContainer.prepend(cardElement);
}

function submitPlaceAddForm (evt) {
  evt.preventDefault();
  closeActivePopUp();
  addCardPrepend (createCard(placeInput.value, addressInput.value))
};

//Добавление карточек
initialCards.forEach((item) => {
  addCardPrepend (createCard(item.name, item.link))
});

//Кнопки/Слушатели
//1. Открытие
profileEditButton.addEventListener('click', openProfileEditPopUp);
elementAddButton.addEventListener('click', openElementAddPopUp);

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

const validateProfileForm = new FormValidator(formValidationObject, profileEditForm);
validateProfileForm.enableValidation();

const validatePlaceForm = new FormValidator(formValidationObject, placeAddForm);
validatePlaceForm.enableValidation();
