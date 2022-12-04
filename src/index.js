import './index.css';

import FormValidator from './scripts/components/FormValidator.js';
import Section  from './scripts/components/Section.js';
import Card from './scripts/components/Card.js';
import PopupWithImage from './scripts/components/PopupWithImage.js';
import PopupWithForm from './scripts/components/PopupWithForm.js';
import UserInfo from './scripts/components/UserInfo.js';

import {selectors, namesForValidation} from './scripts/utils/constants.js';

const formValidators = {}

const popupProfileElement = document.querySelector(selectors.blockPopup.popupProfile),
      popupProfileName = popupProfileElement.querySelector(selectors.blockPopup.profName),
      popupProfileProfession = popupProfileElement.querySelector(selectors.blockPopup.profJob);

const popupNewCardElement = document.querySelector(selectors.blockPopup.popupNewCard);

const profile = document.querySelector(selectors.blockProfile.profile),
      editButton = profile.querySelector(selectors.blockProfile.editButton),
      addButton = profile.querySelector(selectors.blockProfile.addButton);

// ============================================================================
const popupFullImg = new PopupWithImage(selectors.blockPopup.popupFullImg);

const formProfile = new PopupWithForm(handleProfileFormSubmit , selectors.blockPopup.popupProfile);

const formNewCard = new PopupWithForm(handleAddCardSubmit, selectors.blockPopup.popupNewCard);

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

popupFullImg.setEventListeners();
formProfile.setEventListeners();
formNewCard.setEventListeners();

setValidation(namesForValidation);

editButton.addEventListener('click', () => {
    formProfile.open();
    const userInfo = user.getUserInfo();

    popupProfileName.value = userInfo.name;
    popupProfileProfession.value = userInfo.profession;

    formValidators[getFormName(popupProfileElement)].resetValidation();
});

addButton.addEventListener('click', () => {
    formNewCard.open();
    formValidators[getFormName(popupNewCardElement)].resetValidation();
});

fetch('https://nomoreparties.co/v1/cohort-55/users/me', { // 1. Загрузка информации о пользователе с сервера
  headers: {
    authorization: 'fd4b5af0-133d-42b5-9fcc-8b1d210cd42a'
  }
})
  .then(res => res.json())
  .then((result) => {
    const userDataObj = {};
    userDataObj.name = result.name;
    userDataObj.profession = result.about;
    user.setUserInfo(userDataObj);
    document.querySelector(".profile__avatar").src = result.avatar;
  }); 


fetch('https://mesto.nomoreparties.co/v1/cohort-55/cards', { // 2. Загрузка карточек с сервера 
    headers: {
        authorization: 'fd4b5af0-133d-42b5-9fcc-8b1d210cd42a'
    }
}).
    then(res => res.json()).
    then((result) => {
        const arrBaseCards = [];
        result.forEach(element => {
            const obj = {};
            obj.name = element.name;
            obj.link = element.link;
            arrBaseCards.push(obj);
        });
        return arrBaseCards;
    }).
    then((arr) => {
        console.log(arr);
        const addingCards = new Section({
            items: arr,
            renderer: createCard
        }, selectors.elements);

        addingCards.renderItems();
    });