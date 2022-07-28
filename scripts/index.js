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
        figure: '.popup__figure',
        img: '.popup__img',
        imgName: '.popup__img-name'
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
        element: '.element-template',
        figure: '.figure-template'
    }
}

const popupProfile = document.querySelector(selectors.blockPopup.popupProfile),
      formProfile = popupProfile.querySelector(selectors.blockPopup.formProfile),
      inputName = formProfile.querySelector(selectors.blockPopup.inputName),
      inputJob = formProfile.querySelector(selectors.blockPopup.inputJob);

const popupNewCard = document.querySelector(selectors.blockPopup.popupNewCard),
      formNewCard = popupNewCard.querySelector(selectors.blockPopup.formNewCard),
      inputTitle = popupNewCard.querySelector(selectors.blockPopup.inputTitle),
      inputLink = popupNewCard.querySelector(selectors.blockPopup.inputLink);

const popupFullPicture = document.querySelector(selectors.blockPopup.figure).closest('.popup'),
      pictureLink = popupFullPicture.querySelector(selectors.blockPopup.img),
      pictureName = popupFullPicture.querySelector(selectors.blockPopup.imgName);

const profile = document.querySelector(selectors.blockProfile.profile),
      profileName = profile.querySelector(selectors.blockProfile.name),
      profileProfession = profile.querySelector(selectors.blockProfile.profession),
      editButton = profile.querySelector(selectors.blockProfile.editButton),
      addButton = profile.querySelector(selectors.blockProfile.addButton);

const cardsContainer = document.querySelector(selectors.blockElements.elements);

const elementTemplate = document.querySelector(selectors.blockTemplate.element).content.querySelector('.element');

const popupList = Array.from(document.querySelectorAll('.popup'));

function handleAddCardSubmit(evt) {
    evt.preventDefault();

    const cardData = {};
    cardData.name = inputTitle.value;
    cardData.link = inputLink.value;
    const elementTemplate = createTemplateCard(cardData);
    evt.target.reset();

    cardsContainer.prepend(elementTemplate);
    closePopup();
}

function createTemplateCard(item) {
    const cardTemplate = elementTemplate.cloneNode(true);
    const img = cardTemplate.querySelector('.element__img');
    const cardName = cardTemplate.querySelector('.element__text');
    const like = cardTemplate.querySelector('.element__like');
    const buttonDeleteCard = cardTemplate.querySelector('.element__delete-icon');

    cardName.textContent = item.name;
    img.src = item.link;
    img.alt = item.name;
    img.addEventListener('click', initPicturePopup);
    like.addEventListener('click', () => like.classList.toggle('element__like_active')); // <=  Добавление лайка.
    buttonDeleteCard.addEventListener('click', () => cardTemplate.remove()); // <=  Удаление карточки.

    return cardTemplate;
}

function initPicturePopup(evt) {
    pictureLink.src = evt.target.src;
    pictureLink.alt = evt.target.alt;
    pictureName.textContent = evt.target.alt;
    openPopup(popupFullPicture);
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

initialCards.forEach((item) => {
    const elementTemplate = createTemplateCard(item);
    cardsContainer.append(elementTemplate);
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

editButton.addEventListener('click', initProfileForm);
addButton.addEventListener('click', initFormAddCard);

formProfile.addEventListener('submit', handleProfileFormSubmit);
formNewCard.addEventListener('submit', handleAddCardSubmit);