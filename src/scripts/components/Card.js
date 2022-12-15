export default class Card {
    constructor({name, link, counter = 0}, handleCardClick, handleDeleteClick, templateSelector) {
        this._name = name;
        this._link = link;
        this._counter = counter;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteClick = handleDeleteClick;
    }

    generateCard() {
        this._elementCard = this._getTemplate();
        this._imgCard = this._elementCard.querySelector('.element__img');
        this._textCard = this._elementCard.querySelector('.element__text');
        this._likeCard = this._elementCard.querySelector('.element__like');
        this._deleteIconCard = this._elementCard.querySelector('.element__delete-icon');
        this._likeCounter = this._elementCard.querySelector('.element__like-counter');
        this._setEventLiteners();

        this._imgCard.src = this._link;
        this._imgCard.alt = this._name;
        this._textCard.textContent = this._name;
        this._likeCounter.textContent = this._counter;

        return this._elementCard;
    }

    _getTemplate() {
        const cardElement = document
        .querySelector(this._templateSelector)
        .content
        .querySelector('.element')
        .cloneNode(true);

        return cardElement;
    }

    _setEventLiteners() {
        this._imgCard.addEventListener('click', () =>  this._handleCardClick());

        this._likeCard.addEventListener('click', () => this._handleLikeClick());

        this._deleteIconCard.addEventListener('click', (evt) => this._handleDeleteClick(evt.target));
    }

    _handleLikeClick() {
        this._likeCard.classList.toggle('element__like_active');
    }
}