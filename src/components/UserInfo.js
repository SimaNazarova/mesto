export default class UserInfo{
  constructor({userName, userAbout}) {
    this._userName = userName;
    this._userAbout = userAbout;
    this._formName = document.querySelector('.popup__form-name');
    this._formJob = document.querySelector('.popup__form-job')
}

getUserInfo () {
    this._formName.value = this._userName.textContent;
    this._formJob.value = this._userAbout.textContent;
}

setUserInfo () {
    this._userName.textContent = this._formName.value;
    this._userAbout.textContent = this._formJob.value;
}
}
