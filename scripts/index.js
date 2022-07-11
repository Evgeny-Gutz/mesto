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


const rootNode = document.querySelector('.root');

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
      crossFullPicture = popupFullPicture.querySelector(selectors.block_popup.cross);

const profile = document.querySelector(selectors.block_profile.profile),
      profileName = profile.querySelector(selectors.block_profile.name),
      profileProfession = profile.querySelector(selectors.block_profile.profession),
      editButton = profile.querySelector(selectors.block_profile.editButton),
      addButton = profile.querySelector(selectors.block_profile.addButton);

const cardsContainer = document.querySelector(selectors.block_elements.elements);

const elementTemplate = document.querySelector(selectors.block_templates.element).content.querySelector('.element');


function handlerSubmitNewCard(evt) {
    evt.preventDefault();
    const cardData = {};
    cardData.name = inputTitle.value;
    cardData.link = inputLink.value;
    const elementTemplate = createTemplateCard(cardData);

    cardsContainer.prepend(elementTemplate);
    closePopup(evt);
}

function createTemplateCard(item) {
    const cardTemplate = elementTemplate.cloneNode('.element');
    const img = cardTemplate.querySelector('.element__img');
    const cardName = cardTemplate.querySelector('.element__text');
    const like = cardTemplate.querySelector('.element__like');
    const buttonDeleteCard = cardTemplate.querySelector('.element__delete-icon');

    cardName.textContent = item.name;
    img.src = item.link;
    img.alt = item.name;
    img.addEventListener('click', createNewDataForPopupPicture);
    img.addEventListener('click', openPopup);
    like.addEventListener('click', () => like.classList.toggle('element__like_active')); // <=  Добавление лайка.
    buttonDeleteCard.addEventListener('click', () => cardTemplate.remove()); // <=  Удаление карточки.

    return cardTemplate;
}

function createNewDataForPopupPicture(evt) {
    const pictureLink = popupFullPicture.querySelector('.popup__img');
    const pictureName = popupFullPicture.querySelector('.popup__img-name');

    pictureLink.src = evt.target.src;
    pictureName.textContent = evt.target.alt;
}

function openProfileForm() {
    inputName.value = profileName.textContent;
    inputJob.value = profileProfession.textContent;
}

function handlerSubmitFormProfile(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileProfession.textContent = inputJob.value;
    closePopup(evt);
}

function openPopup(evt) {
    if (evt.target === editButton) {
        popupProfile.classList.add('popup_opened');
        return;
    }
    else if (evt.target.classList.contains('element__img')) {
        popupFullPicture.classList.add('popup_opened');
        return;
    }
    popupNewCard.classList.add('popup_opened');
}

function closePopup(evt) {
    evt.target.closest('.popup').classList.remove('popup_opened');
}

initialCards.forEach((item) => {
    const elementTemplate = createTemplateCard(item);
    cardsContainer.append(elementTemplate);
})

editButton.addEventListener('click', openProfileForm);
editButton.addEventListener('click', openPopup);
crossProfile.addEventListener('click', closePopup);
formProfile.addEventListener('submit', handlerSubmitFormProfile);

addButton.addEventListener('click', openPopup);
crossNewCard.addEventListener('click', closePopup);

crossFullPicture.addEventListener('click', closePopup);

formNewCard.addEventListener('submit', handlerSubmitNewCard);