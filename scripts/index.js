let profileName = document.querySelector('.profile__name');
let profileOccupation = document.querySelector('.profile__occupation')
let formElement = document.querySelector('.form');
let nameInput = document.querySelector('.form__input_user_name');
let jobInput = document.querySelector('.form__input_user_occupation');
let popUp = document.querySelector('.popup');
let openButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');

function openPopUp() {
  popUp.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileOccupation.textContent;
}

function closePopUp() {
  popUp.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileOccupation.textContent =  jobInput.value;
    closePopUp();
}

openButton.addEventListener('click', openPopUp);
closeButton.addEventListener('click', closePopUp);
formElement.addEventListener('submit', formSubmitHandler);
