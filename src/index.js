import './index.css';

import FormValidator from '../scripts/components/FormValidator.js'; // ( + )
import Section  from '../scripts/components/Section.js'; // ( + )
import Card from '../scripts/components/Card.js'; // ( + )
import PopupWithImage from '../scripts/components/PopupWithImage.js'; // ( + )
import PopupWithForm from '../scripts/components/PopupWithForm.js'; // ( + )
import UserInfo from '../scripts/components/UserInfo.js'; // ( + )

import arrBaseCards from '../scripts/utils/cards.js'; // ( + )
import {selectors, namesForValidation} from '../scripts/utils/constants.js'; // ( + )

const formValidators = {}

const popupProfileElement = document.querySelector(selectors.blockPopup.popupProfile);
const popupProfileName = document.querySelector(selectors.blockPopup.popupProfile).querySelector('.popup__input_type_name');
const popupProfileProfession = document.querySelector(selectors.blockPopup.popupProfile).querySelector('.popup__input_type_job');

const popupNewCardElement = document.querySelector(selectors.blockPopup.popupNewCard);

const profile = document.querySelector(selectors.blockProfile.profile),
      editButton = profile.querySelector(selectors.blockProfile.editButton),
      addButton = profile.querySelector(selectors.blockProfile.addButton);


const popupFullImg = new PopupWithImage(selectors.blockPopup.popupFullImg); // Создание экземпляра попапа Полного изображения

const formProfile = new PopupWithForm(handleProfileFormSubmit , selectors.blockPopup.popupProfile); // Создание экземпляра попапа профиля


const formNewCard = new PopupWithForm(handleAddCardSubmit, selectors.blockPopup.popupNewCard); // Создание экземпляра попапа новой карточки

const addingCards = new Section({
    items: arrBaseCards,
    renderer: createCard
}, selectors.elements);

const setValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector))
    formList.forEach((formElement) => {
        const validator = new FormValidator(config, formElement);
        const formName = formElement.getAttribute('name');

        formValidators[formName] = validator;
        validator.enableValidation();
    });
};

const user = new UserInfo({
    selectorNamePerson: selectors.blockProfile.name,
    selectorAboutPerson: selectors.blockProfile.profession
});

function handleAddCardSubmit(evt, obj) {
    evt.preventDefault();

    const objTitleLinkNew = {
        name: obj['title'],
        link: obj['link']
    };

    addingCards.addItem(createCard(objTitleLinkNew));

    formNewCard.close();
}

function handleProfileFormSubmit(evt, obj) {
    evt.preventDefault();

    user.setUserInfo(obj);

    formProfile.close();
}

function createCard(obj) {
    const newCard = new Card(obj, () => {popupFullImg.open(obj)}, selectors.elementTemplate);
    const cardElement = newCard.generateCard();
    return cardElement;
}

function getFormName(popup) {
    return popup.querySelector(selectors.form).getAttribute('name');
}

// ============================================================================

addingCards.renderItems();

popupFullImg.setEventListeners();
formProfile.setEventListeners();
formNewCard.setEventListeners();

setValidation(namesForValidation);

editButton.addEventListener('click', () => {
    formProfile.open();

    popupProfileName.value = user.getUserInfo().name;
    popupProfileProfession.value = user.getUserInfo().profession;

    formValidators[getFormName(popupProfileElement)].resetValidation();
});

addButton.addEventListener('click', () => {
    formNewCard.open();
    formValidators[getFormName(popupNewCardElement)].resetValidation();
});