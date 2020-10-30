import "./index.css";
import  Card from '../components/card.js';
import  Section from '../components/Section.js';
import  FormValidator from '../components/FormValidator.js';
import  PopupWithImage from '../components/PopupWithImage.js';
import  PopupWithForm from '../components/PopupWithForm.js';
import  UserInfo from '../components/UserInfo.js';
import  {initialCards, objSet, cardListSelector, profileEditButton, profileName, profileNameAbout, popupAddPhotoButton,
   elementsTable} from '../utils.js/constants.js';



//------------------------------------------------
//просмотр фото

const popupWithImage = new PopupWithImage('.popup_photo');
popupWithImage.setEventListeners();

//------------------------------------------------
// добавление новой  карточки

const addCardPopup = new PopupWithForm(
  '.popup_add-card',{
  handleFormSubmit: (item) => {
      const card = new Card(item,'.element-template', {
        handleCardClick: () =>{
            popupWithImage.open(item.link, item.name)
        }});
      const cardElement = card.generateCard();
      elementsTable.prepend(cardElement);
  }
})



addCardPopup.setEventListeners();


//слушатель открытия попапа по добавлению фото
popupAddPhotoButton.addEventListener('click', () => {
  cardValidator.toggleButtonState(); //деактивирруем кнопку
  addCardPopup.open();
});


//------------------------------------------------

//------------------------------------------------
// копия класса Section, который отвечает за отрисовку элементов на странице.
const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
      const card = new Card(item,'.element-template', {
          handleCardClick: () =>{
              popupWithImage.open(item.link, item.name)
          }});
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
  }
}, cardListSelector)


cardList.renderItems();



//------------------------------------------------
//редактирование данных в профиле


const user = new UserInfo({
  userName: profileName,
  userAbout: profileNameAbout
})


const editPopupProfile = new PopupWithForm(
 '.popup_profile',{
  handleFormSubmit: () => {
    user.setUserInfo();
  }
})

editPopupProfile.setEventListeners();


profileEditButton.addEventListener('click', () => {
  user.getUserInfo();
  editPopupProfile.open();
  })


//------------------------------------------------


//------------------------------------------------
//валидация данных профайла
const profileValidator = new FormValidator(objSet.profileValidator, objSet);
profileValidator.enableValidation();



//валидация карточки
const cardValidator = new FormValidator(objSet.cardValidator, objSet);
cardValidator.enableValidation();

//------------------------------------------------

