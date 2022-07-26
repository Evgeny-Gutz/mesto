const namesForValidation = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
  }

function enableValidation(config) {
    const formNewCard = document.querySelector(`${config.formSelector}[name="new-card"]`);
    const formProfile = document.querySelector(`${config.formSelector}[name="profile-data"]`);

    function setValidForm(formElement) {
        const formInputs = Array.from(formElement.querySelectorAll(config.inputSelector));
        const buttonElement = formElement.querySelector(config.submitButtonSelector);
        tuggleButtonState(formInputs, buttonElement);    
    
        formInputs.forEach((input) => {
            input.addEventListener('input', () => {
                isValid(input, formElement);
                tuggleButtonState(formInputs, buttonElement);
            });
        })
    }
    
    function tuggleButtonState(inputList, buttonElement) {
        if(!hasInvalidInput(inputList)) {
            buttonElement.classList.remove(config.inactiveButtonClass);
        }
        else {
            buttonElement.classList.add(config.inactiveButtonClass);
        }
    }
    
    function hasInvalidInput(inputList) {
        return inputList.some( inputElem => {
            return !inputElem.validity.valid;
        })
    }
    
    function showInputError(element, formElement, textMessage) {
        const textError = formElement.querySelector(`.${element.id}-error`);
        element.classList.add(config.inputErrorClass);
        textError.classList.add(config.errorClass);
        textError.textContent = textMessage;    
    }
    
    function hideInputError(element, formElement) {
        const textError = formElement.querySelector(`.${element.id}-error`);
        element.classList.remove(config.inputErrorClass);
        textError.classList.remove(config.errorClass);
        textError.textContent = "";
    }
    
    function isValid(formInput, formElement) {
        if(!formInput.validity.valid) {
            showInputError(formInput, formElement, formInput.validationMessage);
        }
        else {
            hideInputError(formInput, formElement);
        }
    }

    setValidForm(formProfile);
    setValidForm(formNewCard);
};

enableValidation(namesForValidation);
