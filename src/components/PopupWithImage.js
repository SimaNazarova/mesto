import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupName= document.querySelector('.popup__image-name');
        this._popupImage = document.querySelector('.popup__image');
    }

    open(link, name) {
        super.open()
        this._popupImage.src = link;
        this._popupName.alt = name;
        this._popupName.textContent = name;
    }
}
