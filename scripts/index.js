import  Card from './card.js';
import  FormValidator from './FormValidator.js';
import  {initialCards, objSet} from './objects.js';
import  {openPopup, closePopup} from './utils.js';

//----профиль----
const profile = document.querySelector('.profile');
const profileEditButton = profile.querySelector('.profile__edit-button');
const profileName = profile.querySelector('.profile__name');
const profileNameAbout = profile.querySelector('.profile__name-about');
const popupAddPhotoButton = profile.querySelector('.profile__add-button');

//----попап редактирования профиля-----

const popupProfile = document.querySelector('.popup_profile');
const popupProfileCloseButton = popupProfile.querySelector('.popup__close');
const profileFormElement = popupProfile.querySelector('.popup__form');
const profileNameInput = profileFormElement.querySelector('.popup__form-name');
const profileJobInput = profileFormElement.querySelector('.popup__form-job');

//----попап добавления карточки-----

const popupAddCard = document.querySelector('.popup_add-card');
const popupAddCardCloseButton = popupAddCard.querySelector('.popup__close');
const cardNameInput = popupAddCard.querySelector('.popup__form-card-name');
const cardLinkInput = popupAddCard.querySelector('.popup__form-link');
const popupCardForm = popupAddCard.querySelector('.popup__form');
const popupAddCardSaveButton = popupAddCard.querySelector('.popup__save-button');

//----попап добавления карточки-----

const popupPhoto  = document.querySelector('.popup_photo');

const popupPhotoClose = popupPhoto.querySelector('.popup__close');


//----загрузка карточек-----
const elementsTable = document.querySelector('.elements__table');



//--------------------------------------------функции------------------------------------------



//функция-обработчик «отправки» формы изменных данных в профайле
function formSubmitHandler (event) {
  event.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileNameAbout.textContent = profileJobInput.value;
  closePopup(popupProfile);
}

//функция по передаче данных для создания новой карточки

function addCard (evt) {
  evt.preventDefault();
  const item = {
    name: cardNameInput.value,
    link: cardLinkInput.value
  }
  const card = new Card(item, '.element-template');
  // Создаём карточку и возвращаем наружу
  const cardElement = card.generateCard();

  // Добавляем в DOM
  elementsTable.prepend(cardElement);
  closePopup(popupAddCard);
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
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileNameAbout.textContent;
  openPopup(popupProfile);
});



//слушатель для закрытия попапа с редактированием данных
popupProfileCloseButton.addEventListener('click', () => {
  closePopup(popupProfile);
});



//слушатель открытия попапа по добавлению фото
popupAddPhotoButton.addEventListener('click', () => {
  popupCardForm.reset();
  cardValidator.toggleButtonState();
  openPopup(popupAddCard);
});



//слушатель закрытия попапа по добавлению фото
popupAddCardCloseButton.addEventListener('click', () => {
  closePopup(popupAddCard);
});


//слушатель по добавлению новой карточки
popupAddCard.addEventListener('submit', addCard);



popupPhotoClose.addEventListener('click', () => {
  closePopup(popupPhoto);
})


//слушатели для закрытия pop-up по клику на затемнении
popupPhoto.addEventListener('mousedown', popupCloseByClickOnOverlay);
popupProfile.addEventListener('mousedown', popupCloseByClickOnOverlay);
popupAddCard.addEventListener('mousedown', popupCloseByClickOnOverlay);


//слушатель отправки введенных данных в профиль
profileFormElement.addEventListener('submit', formSubmitHandler);



//---------------------------- функция для загрузки изначальных карточек на страницу-----

initialCards.forEach((item) => {
  // Создадим экземпляр карточки
  const card = new Card(item, '.element-template');
  // Создаём карточку и возвращаем наружу
  const cardElement = card.generateCard();

  // Добавляем в DOM
  elementsTable.append(cardElement);
});


//------------------------------------------------
//валидация данных профайла
const profileValidator = new FormValidator(objSet.profileValidator, objSet);
profileValidator.enableValidation();



//валидация карточки
const cardValidator = new FormValidator(objSet.cardValidator, objSet);
cardValidator.enableValidation();




