const popUpViewImage = document.querySelector('.popup_type_view-image');
const popUpImage = popUpViewImage.querySelector('.popup__image');
const popUpImageCaption = popUpViewImage.querySelector('.popup__caption');
import {openPopUp} from "./index.js";

export class Card {
  constructor(name, link) {
    this._name = name;
    this._link = link;
  }

  _getTemplate() {
    const element = document.querySelector('#element_template').content.querySelector('.element').cloneNode(true);
    return element;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name;
    this._element.querySelector('.element__text').textContent = this._name;

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.element__like-button').addEventListener('click', () => {this._toggleLike()});
    this._element.querySelector('.element__delete-icon').addEventListener('click', () => {this._deleteElement()});
    this._element.querySelector('.element__image').addEventListener('click', () => {this._openImage()})
  }

  _toggleLike() {
    this._element.querySelector('.element__like-button').classList.toggle('element__like-button_active')

}
  _deleteElement() {
    this._element.remove();
  }

  _openImage() {
    popUpImage.src = this._link;
    popUpImage.alt = this._name;
    popUpImageCaption.textContent = this._name;
    openPopUp(popUpViewImage)
}

  _closePopUpOnEscKey(evt) {
    if (evt.key === 'Escape') {
    popUpViewImage.classList.remove('popup_opened')
  }
  }
}

