import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleClickSubmit) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
        this._handleClickSubmit = handleClickSubmit;
        this._dataInputs = Array.from(this._popup.querySelectorAll('.popup__input'));
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleClickSubmit(this._getInputValues());
        })
    }

    close() {
        super.close();
        this._form.reset();
    }

    setNewHandleClickSubmit(newhandleClickSubmit) {
        this._handleClickSubmit = newhandleClickSubmit;
    }

    _getInputValues() {
        this._values = {};
        this._dataInputs.forEach( input => this._values[input.name] = input.value);

        return this._values;
    }
}