let profileName = document.querySelector('.profile__name');
let profileOccupation = document.querySelector('.profile__occupation')
let formElement = document.querySelector('.form');
let nameInput = document.querySelector('.form__name');
let jobInput = document.querySelector('.form__occupation');
let popUp = document.querySelector('.popup');

function openPopUp() {
  popUp.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileOccupation.textContent;
}

let openButton = document.querySelector('.profile__edit-button');
openButton.addEventListener('click', openPopUp);

function closePopUp() {
  popUp.classList.remove('popup_opened');
}

let closeButton = document.querySelector('.popup__close-button');
closeButton.addEventListener('click', closePopUp);

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileOccupation.textContent =  jobInput.value;
    closePopUp();
}

formElement.addEventListener('submit', formSubmitHandler);
