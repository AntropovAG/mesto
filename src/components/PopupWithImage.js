import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popUpSelector) {
    super(popUpSelector);
    this._link = this._popUp.querySelector('.popup__image');
    this._name = this._popUp.querySelector('.popup__caption');
  }

  open(link, name) {
    this._link.src = link;
    this._link.alt = name;
    this._name.textContent = name;

    super.open()
  }

  close() {
    super.close();
    this._link.src = '#';
    this._link.alt = '#';
    this._name.textContent = '';
  }
}
