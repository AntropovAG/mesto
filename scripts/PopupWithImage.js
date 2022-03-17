import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popUpSelector, link, name) {
    super(popUpSelector);
    this._link = link;
    this._name = name
  }

  open(link, name) {
    this._link.src = link;
    this._link.alt = name;
    this._name.textContent = name;

    super.open()
  }
}
