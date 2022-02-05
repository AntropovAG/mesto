// Переменные для формы с профилем
const popUpProfileEdit = document.querySelector('.popup_type_edit-profile');
const profileEditForm = popUpProfileEdit.querySelector('.form');
const nameInput = profileEditForm.querySelector('#username-input');
const jobInput = profileEditForm.querySelector('#occupation-input');
const closeProfileEditButton = popUpProfileEdit.querySelector('.popup__close-button');

//Переменные для формы с местом
const popUpElementAdd = document.querySelector('.popup_type_element-add');
const placeAddForm = popUpElementAdd.querySelector('.form');
const placeInput = placeAddForm.querySelector('#place-input');
const addressInput = placeAddForm.querySelector('#address-input')
const closeElementAddButton = popUpElementAdd.querySelector('.popup__close-button');

//Переменные с попап для картинок
const popUpViewImage = document.querySelector('.popup_type_view-image');
const closePopUpViewImageButton = popUpViewImage.querySelector('.popup__close-button');
const popUpImage = popUpViewImage.querySelector('.popup__image');
const popUpImageCaption = popUpViewImage.querySelector('.popup__caption');

//Переменные со страницы
const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation')
const openProfileEditButton = document.querySelector('.profile__edit-button');
const elementsContainer = document.querySelector('.elements');
const openElementAddButton = document.querySelector('.profile__add-button');
const elementTemplate = document.querySelector('#element_template').content.querySelector('.element');
const popUpArray = Array.from(document.querySelectorAll('.popup'));

//Функции
//1. Открытие попапов
function openPopUp (popup) {
  popup.classList.add('popup_opened');
  window.addEventListener('keydown', closePopUpOnEscKey);
};

function openProfileEditPopUp() {
  openPopUp(popUpProfileEdit);
  nameInput.value = profileName.textContent;
  jobInput.value = profileOccupation.textContent;
  clearValidationErrorAtOpen(popUpProfileEdit, formValidationObject)
};

function openElementAddPopUp() {
  openPopUp(popUpElementAdd);
  placeInput.value = "";
  addressInput.value = "";
  clearValidationErrorAtOpen(popUpElementAdd, formValidationObject)
};

function openImage (evt){
  openPopUp(popUpViewImage);
  const imageTextElement = evt.target.parentElement.querySelector('.element__text').textContent;
  popUpImage.src = evt.target.src;
  popUpImage.alt = imageTextElement;
  popUpImageCaption.textContent = imageTextElement;
};

//2. Закрытие попапов
function closePopUp (popup) {
  popup.classList.remove('popup_opened');
  window.removeEventListener('keydown', closePopUpOnEscKey);
};

function closeActivePopUps () {
  popUpArray.forEach((item) => {
  if (item.matches('.popup_opened')) {
    closePopUp(item)
  }
})}

function closePopUpOnEscKey (evt){
  if (evt.key === 'Escape') {
    closeActivePopUps();
}}

//3. Отправка через формы
function submitProfileForm (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileOccupation.textContent =  jobInput.value;
  closeActivePopUps();
};

function submitPlaceAddForm (evt) {
  evt.preventDefault();
  renderCard(placeInput.value, addressInput.value);
  closeActivePopUps();
};

//4. Кнопка "лайк"
function toggleLike (evt) {
  evt.target.classList.toggle('element__like-button_active')
};

//5. Удаление элемента
function deleteElement (evt) {
  evt.target.parentElement.remove();
};

//6. Создание карточки
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
  elementDeleteButton.addEventListener('click', deleteElement);
  elementImage.addEventListener('click', openImage)

  return element;
};

//7. Добавление карточки
function renderCard(name, link){
  elementsContainer.prepend(addElement(name, link));
};

//Цикл для обработки массива с изначальными карточками
initialCards.forEach((value) => {
  renderCard(value.name, value.link);
});

//Кнопки/Слушатели
//1. Открытие
openProfileEditButton.addEventListener('click', openProfileEditPopUp);
openElementAddButton.addEventListener('click', openElementAddPopUp);

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


