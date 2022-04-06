export default class Card {
  constructor(cardObject, templateSelector, handleCardClick, handleDeleteClick, handleLikeClick, myId) {
    this._name = cardObject.name;
    this._link = cardObject.link;
    this._likes = cardObject.likes;
    this._id = cardObject._id;
    this._ownerId = cardObject.owner._id;
    this._elementSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._myId = myId
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
    this.setLike(this._likes);
    if(this._ownerId !== this._myId){
      this._deleteButton.style.display = 'none'
    }

    if(this.isLiked()){
      this._likeButton.classList.add('element__like-button_active')
    }

    return this._element;
  }

  isLiked() {
    return this._likes.find(user => user._id === this._myId)
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {this._handleLikeClick(this._id)});
    this._deleteButton.addEventListener('click', () => {this._handleDeleteClick(this._id)});
    this._cardImage.addEventListener('click', () => {this._handleCardClick(this._link, this._name)})
  }

  setLike(likes) {
    this._likes = likes
    this._likeCount = this._element.querySelector('.element__like-counter');
    this._likeCount.textContent = this._likes.length

    if(this.isLiked()) {
      this.switchLikeOn()} else {
        this.switchLikeOff()
      }
  }

  switchLikeOn() {
    this._likeButton.classList.add('element__like-button_active')
  }

  switchLikeOff() {
    this._likeButton.classList.remove('element__like-button_active')
  }

  deleteElement() {
    this._element.remove();
    this._element = null;
  }
}

