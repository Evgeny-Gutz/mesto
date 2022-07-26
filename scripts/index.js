const selectors = {
    block_popup: {
        popup: '.popup',
        inputName: '.popup__input_type_name',
        inputJob: '.popup__input_type_job',
        inputTitle: '.popup__input_type_title',
        inputLink: '.popup__input_type_link',
        formProfile: '.popup__form[name="profile-data"]',
        formNewCard: '.popup__form[name="new-card"]',
        cross: '.popup__cross',
        figure: '.popup__figure',
        img: '.popup__img',
        imgName: '.popup__img-name'
    },
    block_profile: {
        profile: '.profile',
        name: '.profile__name',
        profession: '.profile__profession',
        editButton: '.profile__edit-button',
        addButton: '.profile__add-button'
    },
    block_elements: {
        elements: '.elements'
    },
    block_templates: {
        element: '.element-template',
        figure: '.figure-template'
    }
}

const popupProfile = document.querySelector(selectors.block_popup.formProfile).closest('.popup'),
      crossProfile = popupProfile.querySelector(selectors.block_popup.cross),
      formProfile = popupProfile.querySelector(selectors.block_popup.formProfile),
      inputName = formProfile.querySelector(selectors.block_popup.inputName),
      inputJob = formProfile.querySelector(selectors.block_popup.inputJob);

const popupNewCard = document.querySelector(selectors.block_popup.formNewCard).closest('.popup'),
      crossNewCard = popupNewCard.querySelector(selectors.block_popup.cross),
      formNewCard = popupNewCard.querySelector(selectors.block_popup.formNewCard),
      inputTitle = popupNewCard.querySelector(selectors.block_popup.inputTitle),
      inputLink = popupNewCard.querySelector(selectors.block_popup.inputLink);

const popupFullPicture = document.querySelector(selectors.block_popup.figure).closest('.popup'),
      crossFullPicture = popupFullPicture.querySelector(selectors.block_popup.cross),
      pictureLink = popupFullPicture.querySelector(selectors.block_popup.img),
      pictureName = popupFullPicture.querySelector(selectors.block_popup.imgName);

const profile = document.querySelector(selectors.block_profile.profile),
      profileName = profile.querySelector(selectors.block_profile.name),
      profileProfession = profile.querySelector(selectors.block_profile.profession),
      editButton = profile.querySelector(selectors.block_profile.editButton),
      addButton = profile.querySelector(selectors.block_profile.addButton);

const cardsContainer = document.querySelector(selectors.block_elements.elements);

const elementTemplate = document.querySelector(selectors.block_templates.element).content.querySelector('.element');

const popupList = Array.from(document.querySelectorAll('.popup'));

function handleAddCardSubmit(evt) {
    evt.preventDefault();
    const buttonElem = evt.target.querySelector('.popup__submit');

    if (buttonElem.classList.contains('popup__submit_inactive')) {
        return false;
    };

    const cardData = {};
    cardData.name = inputTitle.value;
    cardData.link = inputLink.value;
    const elementTemplate = createTemplateCard(cardData);

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
    const buttonElem = evt.target.querySelector('.popup__submit');

    if (buttonElem.classList.contains('popup__submit_inactive')) {
        return false;
    };

    profileName.textContent = inputName.value;
    profileProfession.textContent = inputJob.value;
    closePopup();
}

function initFormAddCard() {
    openPopup(popupNewCard);
}

function openPopup(popupName) {
    popupName.classList.add('popup_opened');
}

function closePopup() {
    document.querySelector('.popup_opened').classList.remove('popup_opened');
}

function setValidForm(formElement) {
    const formInputs = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__submit');
    tuggleButtonState(formInputs, buttonElement);    

    formInputs.forEach((input) => {
        input.addEventListener('input', () => {
            isValid(input, formElement);
            tuggleButtonState(formInputs, buttonElement);
        });
    })
}

function tuggleButtonState(inputList, buttonElement) {
    if(!hasInvalidInput(inputList)) {
        buttonElement.classList.remove('popup__submit_inactive');
    }
    else {
        buttonElement.classList.add('popup__submit_inactive');
    }
}

function hasInvalidInput(inputList) {
    return inputList.some( inputElem => {
        return !inputElem.validity.valid;
    })
}

function showInputError(element, formElement, textMessage) {
    const textError = formElement.querySelector(`.${element.id}-error`);
    element.classList.add('popup__input_type_error');
    textError.classList.add('popup__input-error_active');
    textError.textContent = textMessage;
    
}

function hideInputError(element, formElement) {
    const textError = formElement.querySelector(`.${element.id}-error`);
    element.classList.remove('popup__input_type_error');
    textError.classList.remove('popup__input-error_active');
    textError.textContent = "";
}

function isValid(formInput, formElement) {
    if(!formInput.validity.valid) {
        showInputError(formInput, formElement, formInput.validationMessage);
    }
    else {
        hideInputError(formInput, formElement);
    }
}

function isPopupOpen(popupList) {
    return popupList.some( (elem) => {
        return elem.classList.contains('popup_opened');
    })
}

initialCards.forEach((item) => {
    const elementTemplate = createTemplateCard(item);
    cardsContainer.append(elementTemplate);
})

document.addEventListener('keydown', (evt) => {
    if(evt.key === 'Escape' && isPopupOpen(popupList)) closePopup();
})

popupList.forEach( elem => {
    Array.from(elem.children).forEach( (item) => {
        item.addEventListener('click', (evt) => {
            evt.stopPropagation();
        })
    })
    elem.addEventListener('click', closePopup);
})

editButton.addEventListener('click', initProfileForm);
addButton.addEventListener('click', initFormAddCard);

crossProfile.addEventListener('click', closePopup);
crossNewCard.addEventListener('click', closePopup);
crossFullPicture.addEventListener('click', closePopup);

formProfile.addEventListener('submit', handleProfileFormSubmit);
formNewCard.addEventListener('submit', handleAddCardSubmit);
setValidForm(formProfile);
setValidForm(formNewCard);