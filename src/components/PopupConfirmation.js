import  Popup  from './Popup.js';

export default class PopupConfirmation extends Popup {
    constructor({ popupSelector, callbackSubmit}) {
        super(popupSelector)
        this._callbackSubmit = callbackSubmit
    }

    open(card) {
      super.open();
      this._card = card;
    }


   _submitHandler() {
      this._callbackSubmit(this._card);
  }

    setEventListeners() {
        super.setEventListeners();
        this._popupElement.addEventListener('submit', (evt) => {
          evt.preventDefault();
          this._submitHandler();
        })
    }
}

