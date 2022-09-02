export default class Card {
    constructor(data, templateSelector) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._config = {
            popup: '.popup',
            element: '.element',
            elementImg: '.element__img',
            elementText: '.element__text',
            elementLike: '.element__like',
            elementDeleteIcon: '.element__delete-icon',
            popupImg: '.popup__img',
            popupImgName: '.popup__img-name',
            popupFigure: '.popup__figure',
            popupOpened: 'popup_opened',
            elementLikeActive: 'element__like_active',
        }
    }

    _getTemplate() {
        return document.querySelector(this._templateSelector).content.querySelector(this._config.element);
    }

    _closeByEscape(evt) {
        if(evt.key === 'Escape') {
            this._closePopup();
        }
    }

    _closePopup () {
        const openedPopup = document.querySelector('.' + this._config.popupOpened);
        if (openedPopup) {
            openedPopup.classList.remove(this._config.popupOpened);
            document.removeEventListener('keydown', (evt) => this._closeByEscape(evt));
        }
    }

    _openPopup(popupName) {
        popupName.classList.add(this._config.popupOpened);
        document.addEventListener('keydown', (evt) => this._closeByEscape(evt));
    }

    _initPicturePopup(evt) {
        const popupFullPicture = document.querySelector(this._config.popupFigure).closest(this._config.popup);
        const pictureLink = popupFullPicture.querySelector(this._config.popupImg);
        const pictureName = popupFullPicture.querySelector(this._config.popupImgName);
        pictureLink.src = evt.target.src;
        pictureLink.alt = evt.target.alt;
        pictureName.textContent = evt.target.alt;
        this._openPopup(popupFullPicture);
    }

    generateCard() {
        const cardTemplate = this._getTemplate().cloneNode(true);
        const img = cardTemplate.querySelector(this._config.elementImg);
        const cardName = cardTemplate.querySelector(this._config.elementText);
        const like = cardTemplate.querySelector(this._config.elementLike);
        const buttonDeleteCard = cardTemplate.querySelector(this._config.elementDeleteIcon);
    
        cardName.textContent = this._name;
        img.src = this._link;
        img.alt = this._name;
        img.addEventListener('click', (evt) => this._initPicturePopup(evt));
        like.addEventListener('click', () => like.classList.toggle(this._config.elementLikeActive)); // <=  Добавление лайка.
        buttonDeleteCard.addEventListener('click', () => cardTemplate.remove()); // <=  Удаление карточки.
    
        return cardTemplate;
    }


}