// Переменные для формы с профилем
const popUpProfileEdit = document.querySelector('#edit_profile');
const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation')
const profileEditForm = popUpProfileEdit.querySelector('.form');

//Переменные для формы с местом
const popUpElementAdd = document.querySelector('#element_add');
const placeAddForm = popUpElementAdd.querySelector('.form');
const nameInput = document.querySelector('.form__input_user_name');
const jobInput = document.querySelector('.form__input_user_occupation');
const placeInput = document.querySelector('.form__input_place_name');
const addressInput = document.querySelector('.form__input_place_address')

const openProfileEditButton = document.querySelector('.profile__edit-button');
const openElementAddButton = document.querySelector('.profile__add-button')
const closeProfileEditButton = popUpProfileEdit.querySelector('.popup__close-button');
const closeElementAddButton = popUpElementAdd.querySelector('.popup__close-button');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
const elementsContainer = document.querySelector('.elements');

function openProfileEditPopUp() {
  popUpProfileEdit.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileOccupation.textContent;
}

function openElementAddPopUp() {
popUpElementAdd.classList.add('popup_opened');
placeInput.value = "";
addressInput.value = "";
}

function closeProfileEditPopUp() {
  popUpProfileEdit.classList.remove('popup_opened');
}

function closeElementAddPopUp() {
  popUpElementAdd.classList.remove('popup_opened');
}

function profileFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileOccupation.textContent =  jobInput.value;
    closeProfileEditPopUp();
}

function placeAddFormSubmit (evt) {
  evt.preventDefault();
  addElement(placeInput.value, addressInput.value);
  closeElementAddPopUp();
}

function addElement(name, link) {
  const elementTemplate = document.querySelector('#element_template').content;
  const Element = elementTemplate.querySelector('.element').cloneNode(true);
  Element.querySelector('.element__text').textContent = name;
  Element.querySelector('.element__image').src = link;
  Element.querySelector('.element__like-button').addEventListener('click', function(evt){
    evt.target.classList.toggle('element__like-button_active')});

  elementsContainer.prepend(Element);
}

initialCards.forEach((value) => {
  addElement(value.name, value.link);
});

openProfileEditButton.addEventListener('click', openProfileEditPopUp);
openElementAddButton.addEventListener('click', openElementAddPopUp);
closeProfileEditButton.addEventListener('click', closeProfileEditPopUp);
closeElementAddButton.addEventListener('click', closeElementAddPopUp);
profileEditForm.addEventListener('submit', profileFormSubmit);
popUpElementAdd.addEventListener('submit', placeAddFormSubmit);

