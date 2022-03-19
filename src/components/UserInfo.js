export default class UserInfo {
  constructor({ nameSelector, occupationSelector }) {
    this._nameInfo = document.querySelector(nameSelector);
    this._occupationInfo = document.querySelector(occupationSelector)
  }

  getUserInfo() {
    const userData = {
      name: this._nameInfo.textContent,
      occupation: this._occupationInfo.textContent
    }
    return userData
  }

  setUserInfo({ name, occupation }) {
    this._nameInfo.textContent = name;
    this._occupationInfo.textContent = occupation
  }
}
