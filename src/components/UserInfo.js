export default class UserInfo {
  constructor({ nameSelector, occupationSelector, photoSelector }) {
    this._nameInfo = document.querySelector(nameSelector);
    this._occupationInfo = document.querySelector(occupationSelector);
    this._photoInfo = document.querySelector(photoSelector)
  }

  getUserInfo() {
    const userData = {
      name: this._nameInfo.textContent,
      occupation: this._occupationInfo.textContent,
    }
    return userData
  }

  setUserInfo({ name, occupation }) {
    this._nameInfo.textContent = name;
    this._occupationInfo.textContent = occupation;
  }

  setUserAvatar({photo}) {
    this._photoInfo.src = photo
  }
}
