import Card from './Card.js';
import FormValidator from './FormValidator.js';
import initialCards from './cards.js';

const selectors = {
    blockPopup: {
        popupProfile: '.profile-popup',
        popupNewCard: '.card-popup',
        inputName: '.popup__input_type_name',
        inputJob: '.popup__input_type_job',
        inputTitle: '.popup__input_type_title',
        inputLink: '.popup__input_type_link',
        formProfile: '.popup__form[name="profile-data"]',
        formNewCard: '.popup__form[name="new-card"]',
    },
    blockProfile: {
        profile: '.profile',
        name: '.profile__name',
        profession: '.profile__profession',
        editButton: '.profile__edit-button',
        addButton: '.profile__add-button'
    },
    blockElements: {
        elements: '.elements'
    },
    blockTemplate: {
        element: '.element-template'
    }
}

const namesForValidation = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
}

const formList = Array.from(document.querySelectorAll(namesForValidation.formSelector));

const popupProfile = document.querySelector(selectors.blockPopup.popupProfile),
      formProfile = popupProfile.querySelector(selectors.blockPopup.formProfile),
      inputName = formProfile.querySelector(selectors.blockPopup.inputName),
      inputJob = formProfile.querySelector(selectors.blockPopup.inputJob);

const popupNewCard = document.querySelector(selectors.blockPopup.popupNewCard),
      formNewCard = popupNewCard.querySelector(selectors.blockPopup.formNewCard),
      inputTitle = popupNewCard.querySelector(selectors.blockPopup.inputTitle),
      inputLink = popupNewCard.querySelector(selectors.blockPopup.inputLink);

const profile = document.querySelector(selectors.blockProfile.profile),
      profileName = profile.querySelector(selectors.blockProfile.name),
      profileProfession = profile.querySelector(selectors.blockProfile.profession),
      editButton = profile.querySelector(selectors.blockProfile.editButton),
      addButton = profile.querySelector(selectors.blockProfile.addButton);

const cardsContainer = document.querySelector(selectors.blockElements.elements);

const popupList = Array.from(document.querySelectorAll('.popup'));

function handleAddCardSubmit(evt) {
    evt.preventDefault();

    const cardData = {};
    cardData.name = inputTitle.value;
    cardData.link = inputLink.value;
    
    evt.target.reset();

    cardsContainer.prepend(createCard(cardData));
    closePopup();
}

function createCard(cardData) {
    const elementTemplate = new Card(cardData, '.element-template', handleCardClick);
    const cardElement = elementTemplate.generateCard();
    return cardElement;
}

function initProfileForm() {
    inputName.value = profileName.textContent;
    inputJob.value = profileProfession.textContent;
    openPopup(popupProfile);
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    profileName.textContent = inputName.value;
    profileProfession.textContent = inputJob.value;
    closePopup();
}

function initFormAddCard() {
    openPopup(popupNewCard);
}

function openPopup(popupName) {
    popupName.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscape);
}

function closePopup() {
    const openedPopup = document.querySelector('.popup_opened')
    if (openedPopup) {
        openedPopup.classList.remove('popup_opened');
        document.removeEventListener('keydown', closeByEscape);
    }
}

function closeByEscape(evt) {
    if(evt.key === 'Escape') {
        closePopup();
    }
}

function handleCardClick(name, link) {
    const popupFullPicture = document.querySelector(this._config.popupFigure).closest(this._config.popup);
    const pictureLink = popupFullPicture.querySelector(this._config.popupImg);
    const pictureName = popupFullPicture.querySelector(this._config.popupImgName);
    pictureLink.src = link;
    pictureLink.alt = name;
    pictureName.textContent = name;
    openPopup(popupFullPicture);
}
  
  

initialCards.forEach((item) => {
    cardsContainer.append(createCard(item));
})

popupList.forEach( popup => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup);
        }
        if (evt.target.classList.contains('popup__close')) {
            closePopup(popup)
        }
    });
})

formList.forEach( (formElement) => {
    formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
        evt.submitter.classList.add(namesForValidation.inactiveButtonClass);
        evt.submitter.setAttribute('disabled', true);   
    })
    const blokForm = new FormValidator(namesForValidation, formElement);
    blokForm.setValadathion();
})

editButton.addEventListener('click', initProfileForm);
addButton.addEventListener('click', initFormAddCard);

formProfile.addEventListener('submit', handleProfileFormSubmit);
formNewCard.addEventListener('submit', handleAddCardSubmit);