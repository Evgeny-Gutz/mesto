import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    open({title, link}) {
        super.open();
        this._popup.querySelector('.popup__img').src = link;
        this._popup.querySelector('.popup__img').alt = title;
        this._popup.querySelector('.popup__img-name').textContent = title;
    }
}