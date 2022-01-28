// Переменные для формы с профилем
const popUpProfileEdit = document.querySelector('#edit_profile');
const profileEditForm = popUpProfileEdit.querySelector('.form');
const nameInput = profileEditForm.querySelector('.form__input_user_name');
const jobInput = profileEditForm.querySelector('.form__input_user_occupation');
const closeProfileEditButton = popUpProfileEdit.querySelector('.popup__close-button');

//Переменные для формы с местом
const popUpElementAdd = document.querySelector('#element_add');
const placeAddForm = popUpElementAdd.querySelector('.form');
const placeInput = placeAddForm.querySelector('.form__input_place_name');
const addressInput = placeAddForm.querySelector('.form__input_place_address')
const closeElementAddButton = popUpElementAdd.querySelector('.popup__close-button');

//Переменные с попап для картинок
const popUpViewImage = document.querySelector('#view_image');
const closePopOpViewImageButton = popUpViewImage.querySelector('.popup-image__close-button');
const popUpImage = popUpViewImage.querySelector('.popup-image__image');
const popUpImageCaption = popUpViewImage.querySelector('.popup-image__caption');

//Переменные со страницы
const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation')
const openProfileEditButton = document.querySelector('.profile__edit-button');
const elementsContainer = document.querySelector('.elements');
const openElementAddButton = document.querySelector('.profile__add-button');
const elementTemplate = document.querySelector('#element_template').content.querySelector('.element');

//Массивы
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

//Функции
//1. Открытие попапов
function openProfileEditPopUp() {
  popUpProfileEdit.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileOccupation.textContent;
};

function openElementAddPopUp() {
  popUpElementAdd.classList.add('popup_opened');
  placeInput.value = "";
  addressInput.value = "";
};

function openImage (evt){
  popUpViewImage.classList.add('popup-image_opened');
  popUpImage.src = evt.target.src;
  popUpImageCaption.textContent = evt.target.parentElement.querySelector('.element__text').textContent;
};

//2. Закрытие попапов
function closeProfileEditPopUp() {
  popUpProfileEdit.classList.remove('popup_opened');
};

function closeElementAddPopUp() {
  popUpElementAdd.classList.remove('popup_opened');
};

function closePopOpViewImage(){
  popUpViewImage.classList.remove('popup-image_opened');
};

//3. Отправка через формы
function submitProfileForm (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileOccupation.textContent =  jobInput.value;
  closeProfileEditPopUp();
};

function submitPlaceAddForm (evt) {
  evt.preventDefault();
  addElement(placeInput.value, addressInput.value);
  closeElementAddPopUp();
};

//4. Кнопка "лайк"
function toggleLike (evt){
  evt.target.classList.toggle('element__like-button_active')
};

//5. Удаление элемента
function elementDelete (evt) {
  evt.target.parentElement.remove();
};

//6. Добавление элемента
function addElement(name, link) {
  const element = elementTemplate.cloneNode(true);
  const elementText = element.querySelector('.element__text');
  const elementImage = element.querySelector('.element__image');
  const elementDeleteButton = element.querySelector('.element__delete-icon');
  const elementLikeButton = element.querySelector('.element__like-button');
  elementText.textContent = name;
  elementImage.src = link;
  elementImage.alt = name;
  elementLikeButton.addEventListener('click', toggleLike);
  elementDeleteButton.addEventListener('click', elementDelete);
  elementImage.addEventListener('click', openImage)

  elementsContainer.prepend(element);
}

//Цикл для обработки массива с изначальными карточками
initialCards.forEach((value) => {
  addElement(value.name, value.link);
});

//Кнопки/слушатели
//1. Открытие
openProfileEditButton.addEventListener('click', openProfileEditPopUp);
openElementAddButton.addEventListener('click', openElementAddPopUp);

//2. Закрытие
closeProfileEditButton.addEventListener('click', closeProfileEditPopUp);
closeElementAddButton.addEventListener('click', closeElementAddPopUp);
closePopOpViewImageButton.addEventListener('click', closePopOpViewImage);

//3. Отправка
profileEditForm.addEventListener('submit', submitProfileForm);
popUpElementAdd.addEventListener('submit', submitPlaceAddForm);


