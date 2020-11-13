export default class Card {
  constructor(
    data,
    selector,
    myId,
    { handleCardClick, handleCardDelete, handleCardLike }
  ) {
    this._link = data.link;
    this._name = data.name;
    this._selector = selector;
    this._myId = myId;
    this._cardId = data._id;
    this._likes = data.likes;
    this._likeTotal = data.likes.length;
    this._ownerId = data.owner._id;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleCardLike = handleCardLike;
  }

  _getTemplate() {
    // забираем размеку из HTML и клонируем элемент
    const cardElement = document
      .querySelector(this._selector)
      .content.querySelector(".element")
      .cloneNode(true);
    // вернём DOM-элемент карточки
    return cardElement;
  }

  deleteHandler() {
    this._element.remove();
    this._element = null;
  }

  _likeHandler() {
    this._element
      .querySelector(".element__like-button")
      .classList.toggle("element__like-button_active");
  }

  hasLike() {
    if (
      this._element
        .querySelector(".element__like-button")
        .classList.contains("element__like-button_active")
    ) {
      return true;
    }
    return false;
  }

  updateLike(likeNumber) {
    this._likeHandler();
    this._element.querySelector(
      ".element__like-number"
    ).textContent = likeNumber;
  }

  getId() {
    return this._cardId;
  }

  generateCard(myId) {
    this._element = this._getTemplate();
    const elementImage = this._element.querySelector(".element__image");
    this._element.querySelector(".element__name").textContent = this._name;
    this._element.querySelector(
      ".element__like-number"
    ).textContent = this._likeTotal;
    elementImage.src = this._link;
    elementImage.alt = this._name;

    if (this._ownerId != myId) {
      this._element
        .querySelector(".element__delete-button")
        .classList.add("element__delete-button_hidden");
    }
    this._likes.forEach((item) => {
      if (item._id == myId) {
        this._element
          .querySelector(".element__like-button")
          .classList.add("element__like-button_active");
      }
    });

    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {
    this._element
      .querySelector(".element__like-button")
      .addEventListener("click", () => this._handleCardLike());
    this._element
      .querySelector(".element__delete-button")
      .addEventListener("click", () => this._handleCardDelete());
    this._element
      .querySelector(".element__image")
      .addEventListener("click", () => this._handleCardClick());
  }
}
