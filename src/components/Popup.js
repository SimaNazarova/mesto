export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
  }
  open(){
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose.bind(this));
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
  }

  _handleEscClose(evt){
  if (evt.key === 'Escape') {
    this.close();
  }
  }


_popupCloseByClickOnOverlay (evt) {
  if (evt.target !== evt.currentTarget) {
    return
  }
  this.close(evt.target);
}

  setEventListeners(){
    this._popupSelector.querySelector('.popup__close').addEventListener('click', this.close.bind(this));
    this._popupSelector.addEventListener('click', this._popupCloseByClickOnOverlay.bind(this));
  }
}


