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

const popupProfile = document.querySelector('.popup_profile');
const elementsTable = document.querySelector('.elements__table');

const popupAddPhotoButton = profile.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup__add-card');
const popupAddCardCloseButton = popupAddCard.querySelector('.popup__close');


const cardNameInput = document.querySelector('.popup__form-card-name');
const linkInput = document.querySelector('.popup__form-link');

const elementDeleteButton = document.querySelector('.element__delete-button');
const cardItem = document.querySelectorAll('.element');

const popupPhoto  = document.querySelector('.popup__photo');
const popupImage = popupPhoto.querySelector('.popup__image');
const popupImageName = popupPhoto.querySelector('.popup__image-name');
const popupPhotoClose = popupPhoto.querySelector('.popup__close');

const itemTemplate = document.querySelector('.item_template').content;

//функция для отображения pop-up----------------------------------------
function popupToggle (popupOpen) {
  popupOpen.classList.toggle('popup_opened');
}


//слушатель для открытия попапа с редактированием данных
profileEditButton.addEventListener('click', () => {
  popupToggle(popupProfile);
});


//здесь показываем, что введенные данные в профиле отображаются в попапе редактрования данных профиля
nameInput.value = profileName.textContent;
jobInput.value = profileNameAbout.textContent;

//функция для закрытия попапа------------------------------------------
function closePopup (closePopup) {
  closePopup.classList.remove('popup_opened');
}

//слушатель для закрытия попапа с редактированием данных
popupCloseButton.addEventListener('click', () => {
  closePopup(popupProfile);
});


//Обработчик «отправки» формы изменных данных в профайле------------------------------
function formSubmitHandler (event) {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileNameAbout.textContent = jobInput.value;
    closePopup(popupProfile);
}

//слушатель отправки введенных данных в профиль
formElement.addEventListener('submit', formSubmitHandler);



//отрисовка карточек-------------------------------------------
function render() {
  initialCards.forEach(renderItem);
}


function renderItem(card) {
  const itemElement = itemTemplate.cloneNode(true);
  itemElement.querySelector('.element__name').textContent = card.name;
  itemElement.querySelector('.element__image').src = card.link;
  itemElement.querySelector('.element__image').alt = card.name;
  elementsTable.prepend(itemElement);
  setListeners ();
}



//слушатель открытия попапа по добавлению фото---------------------------------
popupAddPhotoButton.addEventListener('click', () => {
  popupToggle(popupAddCard);
});


//слушатель закрытия попапа по добавлению фото---------------------------------
popupAddCardCloseButton.addEventListener('click', () => {
  closePopup(popupAddCard);
});



//функция по передаче данных для создания новой карточки--------------

function addCard (evt) {
  evt.preventDefault();
  const item = {
    name: cardNameInput.value,
    link: linkInput.value
  }
  renderItem(item);
  closePopup(popupAddCard);
  cardNameInput.value = '';
  linkInput.value = '';
}

//слушатель по добавлению новой карточки
popupAddCard.addEventListener('submit', addCard);

//функция для лайка--------------------------------------------

  function handlerLike (evt) {
    evt.target.classList.toggle('element__like-button_active');
  }

//функция по удалению карточек----------------------------------------------------

function handlerDelete(evt) {
  evt.target.closest('.element').remove();
}

//функция просмотр фотографии-------------------------------------------------
function viewPhoto (evt) {
  popupToggle(popupPhoto);
  popupImage.src = evt.target.src;
  popupImageName.textContent = evt.target.alt;
}

//слушатель для закрытия попапа с фото-------------------------------------------------
popupPhotoClose.addEventListener('click', () => {
  closePopup(popupPhoto);
})


//слушатели: лайк и удаление, просмотр фото
function setListeners () {
  document.querySelector('.element__like-button').addEventListener('click', handlerLike);
  document.querySelector('.element__delete-button').addEventListener('click',handlerDelete);
  document.querySelector('.element__image').addEventListener('click', viewPhoto);
}


//функция для закрытия pop-up по клику на затемнении
function popupCloseByClickOnOverlay (event) {
  if (event.target !== event.currentTarget) {
    return
  }
  closePopup (event.target);
}

//слушатели для закрытия pop-up по клику на затемнении
popupPhoto.addEventListener('click', popupCloseByClickOnOverlay);
popupProfile.addEventListener('click', popupCloseByClickOnOverlay);
popupAddCard.addEventListener('click', popupCloseByClickOnOverlay);

render();

