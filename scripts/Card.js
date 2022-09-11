export default class Card {
    constructor(data, templateSelector, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
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

    _setEventListeners (img, like, buttonDeleteCard, cardTemplate) {
        img.addEventListener('click', () =>  this._handleCardClick(this._name, this._link)); // <= Открытие попапа полной картинки
        like.addEventListener('click', () => like.classList.toggle(this._config.elementLikeActive)); // <=  Добавление лайка.
        buttonDeleteCard.addEventListener('click', () => cardTemplate.remove()); // <=  Удаление карточки.
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
        this._setEventListeners(img, like, buttonDeleteCard, cardTemplate);
    
        return cardTemplate;
    }


}