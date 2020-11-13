import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
      super(popupSelector)
      this._popupSelector = document.querySelector(popupSelector);
      this._handleFormSubmit = handleFormSubmit;
      this._form = this._popupElement.querySelector('.popup__form');
      this._btnSelector = this._popupSelector.querySelector('.popup__save-button').textContent

  }

  _getInputValues() {
    this._inputList = this._popupElement.querySelectorAll('.popup__form-item');
    this._formValues = [];
    this._inputList.forEach(input => {
        this._formValues[input.name] = input.value;
    });

    return this._formValues;
}

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._handleFormSubmit(this._getInputValues());
    });
}

  close() {
      super.close();
      this._form.reset();
  }


  loadingButtonOn() {
        this._popupSelector.querySelector('.popup__save-button').textContent = 'Сохранение...'
    }

  loadingButtonOff() {
        this._popupSelector.querySelector('.popup__save-button').textContent = this._btnSelector
    }
}

