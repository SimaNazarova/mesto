export default  class Card {
  constructor(data, selector, {handleCardClick}) {
    this._link = data.link;
    this._name = data.name;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
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

  _setEventListeners() {
    this._element.querySelector('.element__like-button').addEventListener('click', () =>  this._likeHandler());
    this._element.querySelector('.element__delete-button').addEventListener('click',  () =>  this._deleteHandler());
    this._element.querySelector('.element__image').addEventListener('click',  () =>  this._handleCardClick());
  }
//функция для лайка
_likeHandler () {
  this._element.querySelector('.element__like-button').classList.toggle('element__like-button_active');
}
//функция по удалению карточек
_deleteHandler() {
  this._element.closest('.element').remove();
 }

 _handleCardClick() {
  this._handleCardClick(this._link, this._name);
}

}



