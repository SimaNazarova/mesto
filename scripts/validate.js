// Функция, которая добавляет класс с ошибкой----------------------
function showInputError (form, inputElement, errorMessage, objSet) {
  // Находим элемент ошибки внутри самой функции
  const errorElement = form.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(objSet['inputErrorClass']);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(objSet['errorClass']);
};


// Функция, которая удаляет класс с ошибкой---------------
function hideInputError (form, inputElement, objSet) {
  const errorElement = form.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(objSet['inputErrorClass']);
  errorElement.textContent = '';
  errorElement.classList.remove(objSet['errorClass'])
}

// Функция, которая проверяет валидность поля----------------------
function checkInputValidity(form, inputElement, objSet) {
if (!inputElement.validity.valid) {
  showInputError(form, inputElement,  inputElement.validationMessage, objSet);
} else {
  hideInputError(form, inputElement, objSet)
}
}


// функция установки обработчикоы события-------------------------
function setEventListeners (form, objSet) {
 const inputList = Array.from(form.querySelectorAll(objSet['inputSelector'])); //массив из инпутов
 const buttonElement = form.querySelector(objSet['submitButtonSelector']);

// чтобы проверить состояние кнопки в самом начале
 toggleButtonState(inputList, buttonElement, objSet);

 // Обойдём все элементы полученной коллекции
 inputList.forEach((inputElement) => {

  // каждому полю добавим обработчик события input
 inputElement.addEventListener('input', () => {

      // Внутри колбэка вызовем checkInputValidity,
      // передав ей форму и проверяемый элемент
  checkInputValidity(form, inputElement, objSet);
  toggleButtonState(inputList, buttonElement, objSet);
 });
 });
};


//функция для вкл/выкл кнопки----------------------------------
 function toggleButtonState  (inputList, buttonElement, objSet) {

  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(objSet['inactiveButtonClass']);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(objSet['inactiveButtonClass']);
    buttonElement.removeAttribute('disabled');
  }
 }

//функция для прохождения по массиву, чтобы выявить хотя бы одно невалидное поле----------
 function hasInvalidInput(inputList){
  return inputList.some((inputElement) => {
  return !inputElement.validity.valid;
});
}


//функция для обработки всех форм на странице-------------------------------

function enableValidation(objSet) {

  // Найдём все формы с указанным классом в DOM, сделаем из них массив
  const formList = Array.from(document.querySelectorAll(objSet['formSelector']));

  // Переберём полученную коллекцию
  formList.forEach((form) => {
    setEventListeners(form, objSet); // Для каждой формы вызовем функцию setEventListeners,передав ей элемент формы
  });
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__form-item',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__form-item_active',
  errorClass: 'popup__error_visible'
});

