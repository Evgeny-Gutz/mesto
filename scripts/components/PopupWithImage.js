import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._img = this._popup.querySelector('.popup__img');
        this._imgName = this._popup.querySelector('.popup__img-name');
    }

    open({name, link}) {
        super.open();
        this._img.src = link;
        this._img.alt = name;
        this._imgName.textContent = name;
    }
}