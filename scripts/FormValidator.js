export default class FormValidator {
    constructor (config, form) {
        this._config = config;
        this._form = form;
    }

    setValadathion() {
        this._setEventListeners();
    }

    _setEventListeners() {
        const formInputs = Array.from(this._form.querySelectorAll(this._config.inputSelector));
        const buttonElement = this._form.querySelector(this._config.submitButtonSelector);
        this._toggleButtonState(formInputs, buttonElement);

        formInputs.forEach((input) => {
            input.addEventListener('input', () => {
                this._isValid(input, this._form);
                this._toggleButtonState(formInputs, buttonElement);
            });
        })
    }

    _toggleButtonState(inputList, buttonElement) {
        if(!this._hasInvalidInput(inputList)) {
            buttonElement.classList.remove(this._config.inactiveButtonClass);
            buttonElement.removeAttribute('disabled');
        }
        else {
            buttonElement.classList.add(this._config.inactiveButtonClass);
            buttonElement.setAttribute('disabled', true);
        }
    }

    _isValid(formInput, formElement) {
        if(!formInput.validity.valid) {
            this._showInputError(formInput, formElement, formInput.validationMessage);
        }
        else {
            this._hideInputError(formInput, formElement);
        }
    }

    _showInputError(element, formElement, textMessage) {
        const textError = formElement.querySelector(`.${element.id}-error`);
        element.classList.add(this._config.inputErrorClass);
        textError.classList.add(this._config.errorClass);
        textError.textContent = textMessage;    
    }

    _hideInputError(element, formElement) {
        const textError = formElement.querySelector(`.${element.id}-error`);
        element.classList.remove(this._config.inputErrorClass);
        textError.classList.remove(this._config.errorClass);
        textError.textContent = "";
    }

    _hasInvalidInput(inputList) {
        return inputList.some( inputElem => {
            return !inputElem.validity.valid;
        })
    }
}