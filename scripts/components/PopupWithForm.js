import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(handleClickSubmit, popupSelector) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
        this._handleClickSubmit = handleClickSubmit;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            this._handleClickSubmit(evt, this._getInputValues());
        })
    }

    close() {
        super.close();
        this._form.reset();
    }

    _getInputValues() {
        this._dataInputs = Array.from(this._popup.querySelectorAll('.popup__input'));
        this._values = {};
        this._values[this._dataInputs[0].name] = this._dataInputs[0].value;
        this._values[this._dataInputs[1].name] = this._dataInputs[1].value;

        return this._values;
    }
}