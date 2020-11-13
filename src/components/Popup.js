export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupElement.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _popupCloseByClickOnOverlay(evt) {
    if (evt.target !== evt.currentTarget) {
      return;
    }
    this.close(evt.target);
  }

  setEventListeners() {
    this._popupElement
      .querySelector(".popup__close")
      .addEventListener("click", this.close.bind(this));
    this._popupElement.addEventListener(
      "click",
      this._popupCloseByClickOnOverlay.bind(this)
    );
  }
}
