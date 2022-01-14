let profileName = document.querySelector('.profile__info_name');
let profileOccupation = document.querySelector('.profile__info_occupation')
let formElement = document.querySelector('.form');
let nameInput = document.querySelector('.form__name');
let jobInput = document.querySelector('.form__occupation');

function openPopUp() {
  let popUp = document.querySelector('.popup');
  popUp.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileOccupation.textContent;
}

let openButton = document.querySelector('.profile__info_edit-button')
openButton.addEventListener('click', openPopUp);

function closePopUp() {
  let popUp = document.querySelector('.popup');
  popUp.classList.remove('popup_opened');
}

let closeButton = document.querySelector('.popup__container_close-button');
closeButton.addEventListener('click', closePopUp);

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileOccupation.textContent =  jobInput.value;
    closePopUp();
}

formElement.addEventListener('submit', formSubmitHandler);
