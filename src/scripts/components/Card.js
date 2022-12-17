export default class Card {
    constructor(obj, handleCardClick, handleDeleteClick, handleLikeClick, templateSelector) {
        this._name = obj.name;
        this._link = obj.link;
        this._counter = obj.counter;
        this._id = obj.id;
        this._userId = obj.userId;
        this._ownerId = obj.ownerId;
        this._likes = obj.likes;

        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteClick = handleDeleteClick;
        this._handleLikeClick = handleLikeClick;
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
        if(this._ownerId !== this._userId) this._deleteIconCard.style.display = 'none';
        if(this.checkingMyLike()) {
            this.setLIke();
        } else {
            this.deleteLike();
        }

        return this._elementCard;
    }

    removeCard() {
        this._elementCard.remove();
    }

    checkingMyLike() {
        return this._likes.find( elem => elem._id === this._userId);
    }

    setLIke(){
        this._likeCard.classList.add('element__like_active');
    }

    changeLike(newValue) {
        this._likes = newValue;
        this._counter = newValue.length;
        this._likeCounter.textContent = this._counter;

        if(this.checkingMyLike()) {
            this.setLIke();
        } else {
            this.deleteLike();
        }
    }

    deleteLike() {
        this._likeCard.classList.remove('element__like_active');
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

        this._likeCard.addEventListener('click', () => this._handleLikeClick(this._id));

        this._deleteIconCard.addEventListener('click', () => this._handleDeleteClick(this._id));
    }
}