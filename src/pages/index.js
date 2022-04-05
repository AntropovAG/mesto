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
        cardDeleteFormSelector
} from '../utils/constants.js';
import {formValidationObject} from '../utils/constants.js';

// let myId;

//Классы
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

//Импорт CSS для сборки
import './index.css';

import { api } from '../components/Api.js';
// api.getUserInfo()
// .then(res => {
//   // myId = res._id;
//   userInfo.setUserInfo({ name: res.name, occupation: res.about });
//   userInfo.setUserAvatar({photo: res.avatar})
// })
// .catch(err => console.log(err))


//Создание карточек
// function createCard (cardObject) {
//    const card = new Card(cardObject, templateSelector, openImagePopUp,
//     (id) =>
//     {
//       cardDeleteFormPopUp.changeHandleSubmit(() => {
//           api.deleteCard(id)
//             .then(res =>{
//               card.deleteElement()
//               cardDeleteFormPopUp.close()
//             })
//             .catch(err => console.log(err))
//         })
//       cardDeleteFormPopUp.open()
//     },
//     (id) => {
//       if(card.isLiked()) {
//         api.removeLike(id)
//           .then(res => card.setLike(res.likes))
//       } else {
//         api.addLike(id)
//           .then(res => card.setLike(res.likes))
//       }},
//     myId
//   );

//   const cardElement = card.generateCard();
//   return cardElement;
// }

// function handledelete (id) {
//   cardDeleteFormPopUp.changeHandleSubmit(() => {
//     api.deleteCard(id)
//       .then(res =>{
//         card.deleteElement();
//         cardDeleteFormPopUp.close()
//       })
//       .catch(err => console.log(err))
//   })
// cardDeleteFormPopUp.open()
// }

function createCard (cardObject, myId) {
  const card = new Card(cardObject, templateSelector, openImagePopUp,
   (id) =>
   {
     cardDeleteFormPopUp.changeHandleSubmit(() => {
         api.deleteCard(id)
           .then(res =>{
             card.deleteElement()
             cardDeleteFormPopUp.close()
           })
           .catch(err => console.log(err))
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
     }},
   myId
 );

 const cardElement = card.generateCard();
 return cardElement;
}

Promise.all([api.getUserInfo(), api.getInitialCards()])
.then((results) => {
  userInfo.setUserInfo({ name: results[0].name, occupation: results[0].about });
  userInfo.setUserAvatar({photo: results[0].avatar})
    results[1].forEach((result) => {
      section.addItem(createCard (result, results[0]._id))

  })
  })
  .catch(err => console.log(err))


const section = new Section({items: [], renderer: (item) =>
  section.addItem(createCard (item))}, containerSelector);

// api.getInitialCards()
//     .then(data => {
//       data.forEach((item) => {
//         section.addItem(createCard (item))
//       })
//     })
//       .catch(err => console.log(err))


//Попап с картинкой
const imagePopUp = new PopupWithImage('.popup_type_view-image');

function openImagePopUp(link, name) {
  imagePopUp.open(link, name)
}

imagePopUp.setEventListeners();

//Попап-форма с информацией о пользователе
const userInfo = new UserInfo({ nameSelector: '.profile__name', occupationSelector: '.profile__occupation', photoSelector: '.profile__photo' })



function handleProfileEditFormSubmit(data) {
  api.editProfile({ name: data.user_name, about: data.user_occupation })
    .then(data => {
      userInfo.setUserInfo({ name: data.name, occupation: data.about });
      profileEditFormPopUp.close()})
      .catch(err => console.log(err))
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
  api.postCard({ name: data.place_name, link: data.place_address })
  .then(data => {
    section.addItem(createCard (data, data.owner._id));
    placeAddFormPopUp.close()
  })
  .catch(err => console.log(err))
}


const placeAddFormPopUp = new PopupWithForm(profilePlaceSelector, handlePlaceAddFormSubmit)

placeAddFormPopUp.setEventListeners();

function openElementAddPopUp() {
  validatePlaceForm.clearValidationErrorAtOpen();
  placeAddFormPopUp.open();
};

elementAddButton.addEventListener('click', openElementAddPopUp)



const cardDeleteFormPopUp = new PopupWithForm(cardDeleteFormSelector);
cardDeleteFormPopUp.setEventListeners()

//Валидация форм
const validateProfileForm = new FormValidator(formValidationObject, profileEditForm);
validateProfileForm.enableValidation();

const validatePlaceForm = new FormValidator(formValidationObject, placeAddForm);
validatePlaceForm.enableValidation();

