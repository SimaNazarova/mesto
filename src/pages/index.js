import "./index.css";
import {
  objSet,
  profileEditButton,
  popupAddPhotoButton,
  formName,
  formJob,
  profileAvatar,
  popupAvatarOpen,
  cardListSelector,
} from "../utils.js/constants.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupConfirmation from "../components/PopupConfirmation.js";

//копия класса Api
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-17",
  headers: "7425052a-c456-4fc7-a0e3-c6a41d33ee63",
});

//копия класса UserInfo
const user = new UserInfo({
  name: ".profile__name",
  about: ".profile__name-about",
  avatar: ".profile__avatar",
});

//копия класса Section
const cardList = new Section(
  {
    renderer: (item, myId) => {
      createCard(item, ".element-template", myId);
    },
  },
  cardListSelector
);

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([cards, userInfo]) => {
    cardList.renderItems(cards, userInfo._id);
    user.setUserInfo(userInfo);
    user.setUserAvatar(userInfo);
  })
  .catch((err) => {
    console.log("Произошла ошибка:", err);
  });

//Создание карточки с функционалом
const createCard = (item, selector, myId) => {
  const card = new Card(item, selector, myId, {
    handleCardClick: () => {
      popupWithImage.open(item.link, item.name);
    },
    handleCardDelete: () => {
      deleteCard.open(card);
    },
    handleCardLike: () => {
      const id = card.getId();
      if (card.hasLike()) {
        api
          .deleteLike(id)
          .then((res) => {
            card.updateLike(res.likes.length);
          })

          .catch((err) => {
            console.log("Произошла ошибка:", err);
          });
      } else {
        api
          .putLike(id)
          .then((res) => {
            card.updateLike(res.likes.length);
          })

          .catch((err) => {
            console.log("Произошла ошибка:", err);
          });
      }
    },
  });

  const cardElement = card.generateCard(myId);
  cardList.addItem(cardElement);
};

// попап добавления новой карточки
const addCardPopup = new PopupWithForm({
  popupSelector: ".popup_add-card",
  handleFormSubmit: (cardInfo) => {
    addCardPopup.loadingButtonOn();
    api
      .addNewCard(cardInfo)
      .then((res) => {
        createCard(res, ".element-template", res.owner._id);
        addCardPopup.close();
      })

      .catch((err) => {
        console.log("Произошла ошибка:", err);
      })

      .finally(() => {
        addCardPopup.loadingButtonOff();
      });
  },
});

//попап картинки
const popupWithImage = new PopupWithImage(".popup_photo");

//попап обновления нового аватара

const popupAvatar = new PopupWithForm({
  popupSelector: ".popup_upload-avatar",
  handleFormSubmit: (data) => {
    popupAvatar.loadingButtonOn();
    api
      .updateUserAvatar(data.link)
      .then(() => {
        profileAvatar.src = data.link;
        popupAvatar.close();
      })

      .catch((err) => {
        console.log("Произошла ошибка:", err);
      })

      .finally(() => {
        popupAvatar.loadingButtonOff();
      });
  },
});

//попап редактирования данных в профиле
const editPopupProfile = new PopupWithForm({
  popupSelector: ".popup_profile",
  handleFormSubmit: (userInfo) => {
    editPopupProfile.loadingButtonOn();
    api
      .editUserInfo(userInfo)
      .then((res) => {
        user.setUserInfo(res);
        editPopupProfile.close();
      })

      .catch((err) => {
        console.log("Произошла ошибка:", err);
      })

      .finally(() => {
        editPopupProfile.loadingButtonOff();
      });
  },
});

//попап подтверждения удаление карточки
const deleteCard = new PopupConfirmation({
  popupSelector: ".popup_delete-confirmation",
  callbackSubmit: (card) => {
    const id = card.getId();
    api
      .deleteCard(id)
      .then(() => {
        card.deleteHandler();
        deleteCard.close();
      })

      .catch((err) => {
        console.log("Произошла ошибка:", err);
      });
  },
});

//слушатели----------------------------------
addCardPopup.setEventListeners(); //добавить фото

popupWithImage.setEventListeners(); //открыть фото

popupAddPhotoButton.addEventListener("click", () => {
  //кнопка открыть попап с формой добавления фото
  cardValidator.toggleButtonState(); //деактивирруем кнопку
  addCardPopup.open();
});

popupAvatar.setEventListeners(); //попап с формой загрузки фото

editPopupProfile.setEventListeners(); //попап с формой редактирования профайла

profileEditButton.addEventListener("click", () => {
  // кнопка открыть попап с формой редактирования профайла
  const userData = user.getUserInfo();
  formName.value = userData.name;
  formJob.value = userData.about;
  editPopupProfile.open();
});

deleteCard.setEventListeners(); // удалить фото

popupAvatarOpen.addEventListener("click", () => {
  // // кнопка открыть попап с формой добавления фото
  avatarValidator.toggleButtonState();
  popupAvatar.open();
});

//-----------------------------------------
//валидация данных профайла
const profileValidator = new FormValidator(objSet.profileValidator, objSet);
profileValidator.enableValidation();

//валидация карточки
const cardValidator = new FormValidator(objSet.cardValidator, objSet);
cardValidator.enableValidation();

//валидация аватара
const avatarValidator = new FormValidator(objSet.avatarValidator, objSet);
avatarValidator.enableValidation();


