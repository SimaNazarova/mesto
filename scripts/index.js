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

const popup = document.querySelector('.popup');
const popupCloseButton = popup.querySelector('.popup__close');
const formElement = popup.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__form-name');
const jobInput = formElement.querySelector('.popup__form-job');

const profile = document.querySelector('.profile');
const profileEditButton = profile.querySelector('.profile__edit-button');
const profileName = profile.querySelector('.profile__name');
const profileNameAbout = profile.querySelector('.profile__name-about');
const popupAddPhotoButton = profile.querySelector('.profile__add-button');

const popupProfile = document.querySelector('.popup__profile');

const elementsTable = document.querySelector('.elements__table');


const popupAddCard = document.querySelector('.popup__add-card');
const popupAddCardCloseButton = popupAddCard.querySelector('.popup__close');
const cardNameInput = popupAddCard.querySelector('.popup__form-card-name');
const linkInput = popupAddCard.querySelector('.popup__form-link');
const popupCardForm = popupAddCard.querySelector('.popup__form');

const popupPhoto  = document.querySelector('.popup__photo');
const popupImage = popupPhoto.querySelector('.popup__image');
const popupImageName = popupPhoto.querySelector('.popup__image-name');
const popupPhotoClose = popupPhoto.querySelector('.popup__close');


//--------------------------------------------функции------------------------------------------


//функция для отображения pop-up
function popupToggle (popupOpen) {
  popupOpen.classList.toggle('popup_opened');
}

//функция для закрытия попапа
function closePopup (closePopup) {
  closePopup.classList.remove('popup_opened');
}

//функция-обработчик «отправки» формы изменных данных в профайле
function formSubmitHandler (event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileNameAbout.textContent = jobInput.value;
  closePopup(popupProfile);
}

//функция по передаче данных для создания новой карточки

function addCard (evt) {
  evt.preventDefault();
  const item = {
    name: cardNameInput.value,
    link: linkInput.value
  }
  renderItem(item);
  closePopup(popupAddCard);
  popupCardForm.reset();
}


//функция для лайка

function likeHandler (evt) {
  evt.target.classList.toggle('element__like-button_active');
}

//функция по удалению карточек

function deleteHandler(evt) {
evt.target.closest('.element').remove();
}

//функция просмотр фотографии
function viewPhotoHandler (evt) {
popupToggle(popupPhoto);
popupImage.src = evt.target.src;
popupImageName.textContent = evt.target.alt;
}

//функция для закрытия pop-up по клику на затемнении
function popupCloseByClickOnOverlay (evt) {
  if (evt.target !== evt.currentTarget) {
    return
  }
  closePopup (evt.target);
}


//-------------------------------------------слушатели-------------------------------------------------

//слушатель для открытия попапа с редактированием данных
profileEditButton.addEventListener('click', () => {
  popupToggle(popupProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileNameAbout.textContent;
});



//слушатель для закрытия попапа с редактированием данных
popupCloseButton.addEventListener('click', () => {
  closePopup(popupProfile);
});


//слушатели: лайк, удаление, просмотр фото
function setListeners () {
  document.querySelector('.element__like-button').addEventListener('click', likeHandler);
  document.querySelector('.element__delete-button').addEventListener('click',deleteHandler);
  document.querySelector('.element__image').addEventListener('click', viewPhotoHandler);
}


//слушатель открытия попапа по добавлению фото
popupAddPhotoButton.addEventListener('click', () => {
  popupToggle(popupAddCard);
});


//слушатель закрытия попапа по добавлению фото
popupAddCardCloseButton.addEventListener('click', () => {
  closePopup(popupAddCard);
});


//слушатель по добавлению новой карточки
popupAddCard.addEventListener('submit', addCard);




//слушатель для закрытия попапа с фото
popupPhotoClose.addEventListener('click', () => {
  closePopup(popupPhoto);
})


//слушатели для закрытия pop-up по клику на затемнении
popupPhoto.addEventListener('click', popupCloseByClickOnOverlay);
popupProfile.addEventListener('click', popupCloseByClickOnOverlay);
popupAddCard.addEventListener('click', popupCloseByClickOnOverlay);


//слушатель отправки введенных данных в профиль
formElement.addEventListener('submit', formSubmitHandler);



//---------------------------- функции для загрузки изначальных карточек на страницу-----

//функция для создания карточек
function makeCard(card) {
  const elementTemplate = document.querySelector('.element-template').content;
  const itemElement = elementTemplate.cloneNode(true);
  const elementName = itemElement.querySelector('.element__name');
  const elementImage = itemElement.querySelector('.element__image');
  elementName.textContent = card.name;
  elementImage.src = card.link;
  elementImage.alt = card.name;
  return itemElement;
}

//функция для добавления карточки в HTML
function renderItem(item) {
  elementsTable.prepend(makeCard(item));
  setListeners();
}

//отрисовка всех карточек из массива
function render() {
  initialCards.forEach(renderItem);
}


render();

