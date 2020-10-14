   class FormValidator {
  constructor(formSelector, objSet) {
    this._formSelector = formSelector
    this._formElement = document.querySelector(formSelector);
    this._inputSelector = objSet.inputSelector
    this._submitButtonSelector = objSet.submitButtonSelector
    this._inactiveButtonClass = objSet.inactiveButtonClass
    this._inputErrorClass = objSet.inputErrorClass
    this._errorClass = objSet.errorClass
    this._buttonElement = objSet.buttonElement
    this._inputList = objSet.inputList
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
  this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector)); //массив из инпутов
  this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);

// чтобы проверить состояние кнопки в самом начале
this._toggleButtonState(this._inputList, this._buttonElement);

 // Обойдём все элементы полученной коллекции
 this._inputList.forEach((inputElement) => {

  // каждому полю добавим обработчик события input
 inputElement.addEventListener('input', () => {

      // Внутри колбэка вызовем checkInputValidity,
      // передав ей форму и проверяемый элемент
      this._checkInputValidity(inputElement);
      this._toggleButtonState();
 });
 });
};


//функция для вкл/выкл кнопки----------------------------------
 _toggleButtonState  () {

  if (this._hasInvalidInput(this._inputList)) {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', true);
  } else {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.removeAttribute('disabled');
  }
 }

//функция для прохождения по массиву, чтобы выявить хотя бы одно невалидное поле----------
 _hasInvalidInput(){
  return this._inputList.some((inputElement) => {
  return !inputElement.validity.valid;
});
}


//функция для обработки всех форм на странице-------------------------------

enableValidation() {
  this._formList = document.querySelector(this._formSelector);
  this._setEventListeners();
};
}


export default FormValidator;

