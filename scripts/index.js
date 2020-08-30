let popup = document.querySelector('.popup');

let popupCloseButton = popup.querySelector('.popup__close');
let formElement =  popup.querySelector('.popup__form');

let nameInput = formElement.querySelector('.popup__form-name');
let jobInput = formElement.querySelector('.popup__form-job');

let profile = document.querySelector('.profile');

let popupProfileEditButton = profile.querySelector('.profile__edit-button');
let profileName = profile.querySelector('.profile__name');
let profileNameAbout = profile.querySelector('.profile__name-about');


//функция для отображения pop-up
function popupToggle () {
  popup.classList.toggle('popup_opened');
}

nameInput.value = profileName.textContent;
jobInput.value = profileNameAbout.textContent;



//функция для закрытия pop-up по клику на затемнении
function popupCloseByClickOnOverlay (event) {
  if (event.target !== event.currentTarget) {
    return
  }
  popupToggle(event)
}

//Обработчик «отправки» формы
function formSubmitHandler (event) {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileNameAbout.textContent = jobInput.value;
    popupToggle();
}


popupProfileEditButton.addEventListener('click', popupToggle);
popupCloseButton.addEventListener('click', popupToggle);
popup.addEventListener('click', popupCloseByClickOnOverlay);
formElement.addEventListener('submit', formSubmitHandler);

