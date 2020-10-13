const initialCards = [
  {
      name: 'Гонконг',
      link: 'https://images.unsplash.com/photo-1516893676001-52fdf7605797?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
      name: 'Токио',
      link: 'https://images.unsplash.com/photo-1557409518-691ebcd96038?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
      name: 'Сиань',
      link: 'https://images.unsplash.com/photo-1483135349295-9e3c48106ee6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80'
  },
  {
      name: 'Пусан',
      link: 'https://images.unsplash.com/photo-1597231125133-ff5d83966e8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1349&q=80'
  },
  {
      name: 'Сингапур',
      link: 'https://images.unsplash.com/photo-1496898382483-9a789056ffe8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80'
  },
  {
      name: 'Бангкок',
      link: 'https://images.unsplash.com/photo-1510379872535-9310dc6fd6a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  }
];

const objSet = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-item',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__form-item_active',
  errorClass: 'popup__error_visible',
  profileValidator: '.popup_profile',
  cardValidator:'.popup_add-card'
}

export {initialCards, objSet};