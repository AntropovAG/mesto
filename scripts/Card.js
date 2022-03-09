const popUpViewImage = document.querySelector('.popup_type_view-image');
const popUpImage = popUpViewImage.querySelector('.popup__image');
const popUpImageCaption = popUpViewImage.querySelector('.popup__caption');

import {openPopUp} from "./index.js";

export class Card {
  constructor(name, link, templateSelector) {
    this._name = name;
    this._link = link;
    this._elementSelector = templateSelector;
  }

  _getTemplate() {
    const element = document.querySelector(this._elementSelector).content.querySelector('.element').cloneNode(true);
    return element;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.element__image');
    this._cardText = this._element.querySelector('.element__text');
    this._likeButton = this._element.querySelector('.element__like-button');
    this._deleteButton = this._element.querySelector('.element__delete-icon');
    this._setEventListeners();

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardText.textContent = this._name;

    return this._element;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {this._toggleLike()});
    this._deleteButton.addEventListener('click', () => {this._deleteElement()});
    this._cardImage.addEventListener('click', () => {this._openImage()})
  }

  _toggleLike() {
    this._likeButton.classList.toggle('element__like-button_active')

  }
  _deleteElement() {
    this._element.remove();
    this._element = null;
  }

  _openImage() {
    popUpImage.src = this._link;
    popUpImage.alt = this._name;
    popUpImageCaption.textContent = this._name;
    openPopUp(popUpViewImage)
  }

}

