//Переменные, объекты, массивы
import {profileFormSelector,
        profileEditForm,
        nameInput,
        jobInput,
        profilePlaceSelector,
        placeAddForm,
        profileEditButton,
        elementAddButton,
        templateSelector,
        containerSelector,
        avatarEditButton,
        cardDeleteFormSelector,
        avatarFormSelector,
        avatarChangeForm
} from '../utils/constants.js';
import {formValidationObject} from '../utils/constants.js';

//Классы
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import UserInfo from '../components/UserInfo.js';

//Импорт CSS для сборки
import './index.css';

import { api } from '../components/Api.js';

//Функция создания карточек
function createCard (cardObject, myId) {
  const card = new Card(cardObject, templateSelector, openImagePopUp,
   (id) => {
     cardDeleteFormPopUp.changeHandleSubmit(() => {
      cardDeleteFormPopUp.changeButtonTextToLoading('Удаление...');
        api.deleteCard(id)
           .then(() =>{
             card.deleteElement();
             cardDeleteFormPopUp.close();
             setTimeout(() => {cardDeleteFormPopUp.changeButtonTextToDefault('Да')}, 1000)
           })
           .catch((err) => {
             console.log(err);
             cardDeleteFormPopUp.close();
             cardDeleteFormPopUp.changeButtonTextToDefault('Да')
            })
       })
     cardDeleteFormPopUp.open()
  },
   (id) => {
     if(card.isLiked()) {
       api.removeLike(id)
         .then(res => card.setLike(res.likes))
    } else {
       api.addLike(id)
         .then(res => card.setLike(res.likes))
    }
  },
   myId
  );

  const cardElement = card.generateCard();
  return cardElement;
}

const section = new Section({items: [], renderer: (item) =>
  section.addItem(createCard (item))}, containerSelector);

//Попап с картинкой
const imagePopUp = new PopupWithImage('.popup_type_view-image');

function openImagePopUp(link, name) {
  imagePopUp.open(link, name)
}

imagePopUp.setEventListeners();

//Попап-форма с информацией о пользователе
const userInfo = new UserInfo({ nameSelector: '.profile__name', occupationSelector: '.profile__occupation', photoSelector: '.profile__photo' })

function handleProfileEditFormSubmit(data) {
  profileEditFormPopUp.changeButtonTextToLoading('Сохранение...')
  api.editProfile({ name: data.user_name, about: data.user_occupation })
    .then(data => {
      userInfo.setUserInfo({ name: data.name, occupation: data.about });
      profileEditFormPopUp.close();
      setTimeout(() => {profileEditFormPopUp.changeButtonTextToDefault("Сохранить")}, 1000)
    })
    .catch((err) => {
      console.log(err);
      profileEditFormPopUp.close();
      placeAddFormPopUp.changeButtonTextToDefault("Сохранить")
    })
}

const profileEditFormPopUp = new PopupWithForm(profileFormSelector, handleProfileEditFormSubmit)
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
function handlePlaceAddFormSubmit(data) {
  placeAddFormPopUp.changeButtonTextToLoading("Сохранение...");
  api.postCard({ name: data.place_name, link: data.place_address })
  .then(data => {
    section.addItem(createCard (data, data.owner._id));
    placeAddFormPopUp.close();
    setTimeout(() => {placeAddFormPopUp.changeButtonTextToDefault("Сохранить")}, 1000)
  })
  .catch((err) => {
    console.log(err);
    placeAddFormPopUp.close();
    placeAddFormPopUp.changeButtonTextToDefault("Сохранить")
  })
}

const placeAddFormPopUp = new PopupWithForm(profilePlaceSelector, handlePlaceAddFormSubmit)
placeAddFormPopUp.setEventListeners();

function openElementAddPopUp() {
  validatePlaceForm.clearValidationErrorAtOpen();
  placeAddFormPopUp.open();
};

elementAddButton.addEventListener('click', openElementAddPopUp)

//Попап для удаления карточки
const cardDeleteFormPopUp = new PopupWithConfirmation(cardDeleteFormSelector);
cardDeleteFormPopUp.setEventListeners()

//Попап для смены аватара
function handleAvatarChangeFormSubmit(data) {
  avatarChangeFormPopUp.changeButtonTextToLoading("Сохранение...");
  api.editAvatar({ avatar: data.photo_link })
    .then(data => {
      userInfo.setUserAvatar({ photo: data.avatar });
      avatarChangeFormPopUp.close();
      setTimeout(() => {avatarChangeFormPopUp.changeButtonTextToDefault("Сохранить")}, 1000)
    })
    .catch((err) => {
      console.log(err);
      avatarChangeFormPopUp.close();
      avatarChangeFormPopUp.changeButtonTextToDefault("Сохранить")
    })
}

function openAvatarChangePopUp() {
  validatePlaceForm.clearValidationErrorAtOpen();
  avatarChangeFormPopUp.open();
};

avatarEditButton.addEventListener('click', openAvatarChangePopUp);

const avatarChangeFormPopUp = new PopupWithForm(avatarFormSelector, handleAvatarChangeFormSubmit);
avatarChangeFormPopUp.setEventListeners();

//Валидация форм
const validateProfileForm = new FormValidator(formValidationObject, profileEditForm);
validateProfileForm.enableValidation();

const validatePlaceForm = new FormValidator(formValidationObject, placeAddForm);
validatePlaceForm.enableValidation();

const validateAvatarChangeForm = new FormValidator(formValidationObject, avatarChangeForm);
validateAvatarChangeForm.enableValidation();


//Обработка промисов при загрузке
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then((results) => {
    userInfo.setUserInfo({ name: results[0].name, occupation: results[0].about });
    userInfo.setUserAvatar({photo: results[0].avatar})
    results[1].forEach((result) => {
      section.addItem(createCard (result, results[0]._id))
    })
  })
  .catch(err => console.log(err))
