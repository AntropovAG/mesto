//Переменные, объекты, массивы
import {profileFormSelector,
        profileEditForm,
        nameInput,
        jobInput,
        profilePlaceSelector,
        placeAddForm,
        placeInput,
        addressInput,
        profileEditButton,
        elementAddButton,
        templateSelector,
        containerSelector,
} from '../utils/constants.js';
import {formValidationObject} from '../utils/constants.js';
import {initialCards} from '../utils/cards.js';

//Классы
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

//Импорт CSS для сборки
import './index.css';

//Создание карточек
function createCard (cardObject) {
  const card = new Card(cardObject, templateSelector, openImagePopUp);
  const cardElement = card.generateCard();
  return cardElement;
}

//Отрисовка карточек
const section = new Section({items: initialCards, renderer: (item) =>
  section.addItem(createCard (item))}, containerSelector);

section.renderItems();

//Попап с картинкой
const imagePopUp = new PopupWithImage('.popup_type_view-image');

function openImagePopUp(link, name) {
  imagePopUp.open(link, name)
}

imagePopUp.setEventListeners();

//Попап-форма с информацией о пользователе
const userInfo = new UserInfo({ nameSelector: '.profile__name', occupationSelector: '.profile__occupation' })

const profileEditFormPopUp = new PopupWithForm(profileFormSelector, (data) => {
  userInfo.setUserInfo({ name: data['user_name'], occupation: data['user_occupation'] })
})

profileEditFormPopUp.setEventListeners();

function openProfilePopUp() {
  const setUserData = userInfo.getUserInfo();
  nameInput.value = setUserData.name;
  jobInput.value = setUserData.occupation;
  validateProfileForm.clearValidationErrorAtOpen()
  profileEditFormPopUp.open();
};

profileEditButton.addEventListener('click', openProfilePopUp)

//Попап-форма добавления карточки
const placeAddFormPopUp = new PopupWithForm(profilePlaceSelector, (data) => {
  section.addItem(createCard ({name: data['place_name'], link: data['place_address']})
)})

placeAddFormPopUp.setEventListeners();

function openElementAddPopUp() {
  placeInput.value = "";
  addressInput.value = "";
  validatePlaceForm.clearValidationErrorAtOpen();
  placeAddFormPopUp.open();
};

elementAddButton.addEventListener('click', openElementAddPopUp)

//Валидация форм
const validateProfileForm = new FormValidator(formValidationObject, profileEditForm);
validateProfileForm.enableValidation();

const validatePlaceForm = new FormValidator(formValidationObject, placeAddForm);
validatePlaceForm.enableValidation();
