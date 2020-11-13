export default class UserInfo {

  constructor({name, about, avatar}) {
    this._name = document.querySelector(name);
    this._about = document.querySelector(about);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo() {
      const userInfo = {
        name: this._name.textContent,
        about: this._about.textContent,
      }
      return userInfo
  }

  setUserInfo(userInfo) {
    this._name.textContent  = userInfo.name;
    this._about.textContent = userInfo.about;
  }

   setUserAvatar(userInfo) {
   this._avatar.src = userInfo.avatar
  }
}
