import FormValidator from '../scripts/components/FormValidator.js'; // ( + )
import Section  from '../scripts/components/Section.js'; // ( + )
import Card from '../scripts/components/Card.js'; // ( + )
import PopupWithImage from '../scripts/components/PopupWithImage.js'; // ( + )
import PopupWithForm from '../scripts/components/PopupWithForm.js'; // ( + )
import UserInfo from '../scripts/components/UserInfo.js'; // ( + )

import arrBaseCards from '../scripts/utils/cards.js'; // ( + )



const selectors = {
    blockPopup: {
        popupProfile: '.profile-popup', // (+)
        popupNewCard: '.card-popup', // (+)
        popupFullImg: '.popup_back-opacity_9'
    },
    blockProfile: {
        profile: '.profile', // (+)
        name: '.profile__name', // (+)
        profession: '.profile__profession', // (+)
        editButton: '.profile__edit-button', // (+)
        addButton: '.profile__add-button' // (+)
    },
    elements: '.elements',
    elementTemplate: '.element-template',
    form: '.popup__form'
}

const namesForValidation = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
}

const formValidators = {}

const popupProfileElement = document.querySelector(selectors.blockPopup.popupProfile);

const popupNewCardElement = document.querySelector(selectors.blockPopup.popupNewCard);

const profile = document.querySelector(selectors.blockProfile.profile),
      editButton = profile.querySelector(selectors.blockProfile.editButton),
      addButton = profile.querySelector(selectors.blockProfile.addButton);


const popupFullImg = new PopupWithImage(selectors.blockPopup.popupFullImg); // Создание экземпляра попапа Полного изображения

const formProfile = new PopupWithForm(handleProfileFormSubmit , selectors.blockPopup.popupProfile); // Создание экземпляра попапа профиля


const formNewCard = new PopupWithForm(handleAddCardSubmit, selectors.blockPopup.popupNewCard); // Создание экземпляра попапа новой карточки

const addingCards = new Section({
    items: arrBaseCards,
    renderer: (objTitleLink) => {
        const elementTemplate = new Card(objTitleLink, () => {
            popupFullImg.open(objTitleLink);
        }, selectors.elementTemplate);
        const cardElement = elementTemplate.generateCard();
        return cardElement;
    }
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

    const elementTemplate = new Card({
        name: obj['title'],
        link: obj['link']
    }, () => {popupFullImg.open(obj);}, selectors.elementTemplate);

    const cardElement = elementTemplate.generateCard();

    addingCards.addItem(cardElement);

    formNewCard.close();
}

function handleProfileFormSubmit(evt, obj) {
    evt.preventDefault();

    user.setUserInfo(obj);

    formProfile.close();
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
    formValidators[getFormName(popupProfileElement)].resetValidation();
});

addButton.addEventListener('click', () => {
    formNewCard.open();
    formValidators[getFormName(popupNewCardElement)].resetValidation();
});