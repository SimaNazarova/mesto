export default class FormValidator {
  constructor(formSelector, objSet) {
    this._formSelector = formSelector
    this._formElement = document.querySelector(formSelector);
    this._inputSelector = objSet.inputSelector
    this._submitButtonSelector = objSet.submitButtonSelector
    this._inactiveButtonClass = objSet.inactiveButtonClass
    this._inputErrorClass = objSet.inputErrorClass
    this._errorClass = objSet.errorClass
    this._profileValidator = objSet.profileValidator
    this._cardValidator = objSet.cardValidator
  }


  // Функция, которая добавляет класс с ошибкой----------------------
_showInputError (inputElement, errorMessage) {
  // Находим элемент ошибки внутри самой функции
  const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(this._inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(this._errorClass);
};


// Функция, которая удаляет класс с ошибкой---------------
_hideInputError (inputElement) {
  const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(this._inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(this._errorClass)
}

// Функция, которая проверяет валидность поля----------------------
_checkInputValidity(inputElement) {
if (!inputElement.validity.valid) {
  this._showInputError(inputElement,  inputElement.validationMessage);
} else {
  this._hideInputError(inputElement)
}
}


// функция установки обработчикоы события-------------------------
_setEventListeners () {
 const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector)); //массив из инпутов
 const buttonElement = this._formElement.querySelector(this._submitButtonSelector);

// чтобы проверить состояние кнопки в самом начале
this._toggleButtonState(inputList, buttonElement);

 // Обойдём все элементы полученной коллекции
 inputList.forEach((inputElement) => {

  // каждому полю добавим обработчик события input
 inputElement.addEventListener('input', () => {

      // Внутри колбэка вызовем checkInputValidity,
      // передав ей форму и проверяемый элемент
      this._checkInputValidity(inputElement);
      this._toggleButtonState(inputList, buttonElement);
 });
 });
};


//функция для вкл/выкл кнопки----------------------------------
 _toggleButtonState  (inputList, buttonElement) {

  if (this._hasInvalidInput(inputList)) {
    buttonElement.classList.add(this._inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(this._inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
 }

//функция для прохождения по массиву, чтобы выявить хотя бы одно невалидное поле----------
 _hasInvalidInput(inputList){
  return inputList.some((inputElement) => {
  return !inputElement.validity.valid;
});
}


//функция для обработки всех форм на странице-------------------------------

enableValidation() {

  // Найдём все формы с указанным классом в DOM, сделаем из них массив
  const formList = Array.from(document.querySelectorAll(this._formSelector));

  // Переберём полученную коллекцию
  formList.forEach(() => {
    this._setEventListeners(); // Для каждой формы вызовем функцию setEventListeners,передав ей элемент формы
  });
};

}




