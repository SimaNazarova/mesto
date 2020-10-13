  class Card {
  constructor(data, selector) {
    this._link = data.link;
    this._name = data.name;
    this._selector = selector;
  }

  _getTemplate() {
    // забираем размеку из HTML и клонируем элемент
      const cardElement = document
      .querySelector( this._selector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    // вернём DOM-элемент карточки
      return cardElement;
  }

  generateCard() {
    // Запишем разметку в приватное поле _element.
    // Так у других элементов появится доступ к ней.
    this._element = this._getTemplate();
    this._setEventListeners(); // добавим обработчики
    // Добавим данные
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__name').textContent = this._name;
    this._element.querySelector('.element__image').alt = this._name;

    // Вернём элемент наружу
    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.element__like-button').addEventListener('click', () =>  this._likeHandler());
    this._element.querySelector('.element__delete-button').addEventListener('click',  () =>  this._deleteHandler());
    this._element.querySelector('.element__image').addEventListener('click',  () =>  this._viewPhotoHandler());
  }

//функция для отображения pop-up
_openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', this._closeByEsc);
}

//функция для закрытия попапа
_closePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', this._closeByEsc);
}


//функция для лайка

_likeHandler () {
  this._element.querySelector('.element__like-button').classList.toggle('element__like-button_active');

}

//функция по удалению карточек

_deleteHandler() {
  this._element.closest('.element').remove();
}

//функция просмотр фотографии
_viewPhotoHandler () {
  const popupPhoto  = document.querySelector('.popup_photo');
  const popupImage = document.querySelector('.popup__image');
  const popupImageName = document.querySelector('.popup__image-name');
  popupImage.src = this._link;
  popupImageName.alt = this._name;
  this._openPopup(popupPhoto);
}

//функция для закрытия попапа  по нажатию на Esc.
_closeByEsc(evt) {
  const openPopup = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    openPopup.classList.remove('popup_opened');
  };
};


}


export default Card;
