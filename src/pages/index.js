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
           })
            .catch((err) => {
              console.log(err);
              cardDeleteFormPopUp.changeButtonTextToDefault('Да')
              })
              .finally(() => {
                setTimeout(() => {cardDeleteFormPopUp.changeButtonTextToDefault('Да')}, 1000)
              })
       })
     cardDeleteFormPopUp.open()
  },
   (id) => {
     if(card.isLiked()) {
       api.removeLike(id)
         .then(res => card.setLike(res.likes))
          .catch(err => console.log(err))
    } else {
       api.addLike(id)
         .then(res => card.setLike(res.likes))
          .catch(err => console.log(err))
    }
  },
   myId
  );

  const cardElement = card.generateCard();
  return cardElement;
}

const section = new Section({items: [], renderer: (item, id) =>
  section.addItem(createCard (item, id))}, containerSelector);

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
    })
      .catch((err) => {
        console.log(err);
        placeAddFormPopUp.changeButtonTextToDefault("Сохранить")
      })
        .finally(() => {
          setTimeout(() => {profileEditFormPopUp.changeButtonTextToDefault("Сохранить")}, 1000)
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
  })
    .catch((err) => {
      console.log(err);
      placeAddFormPopUp.changeButtonTextToDefault("Сохранить")
    })
      .finally(() => {
        setTimeout(() => {placeAddFormPopUp.changeButtonTextToDefault("Сохранить")}, 1000)
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
    })
      .catch((err) => {
        console.log(err);
        avatarChangeFormPopUp.changeButtonTextToDefault("Сохранить")
      })
        .finally(() => {
          setTimeout(() => {avatarChangeFormPopUp.changeButtonTextToDefault("Сохранить")}, 1000)
        })
}

function openAvatarChangePopUp() {
  validateAvatarChangeForm.clearValidationErrorAtOpen();
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
  .then(([userData, cards]) => {
    userInfo.setUserInfo({ name: userData.name, occupation: userData.about });
    userInfo.setUserAvatar({photo: userData.avatar})
    section.renderItems(cards, userData._id)
  })
  .catch(err => console.log(err))
