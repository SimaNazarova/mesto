//функция для отображения pop-up
function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}

//функция для закрытия попапа  по нажатию на Esc.
function closeByEsc(evt) {
  const openPopup = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopup(openPopup);
  };
};


//функция для закрытия попапа
 function closePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
}



export {openPopup, closePopup};
