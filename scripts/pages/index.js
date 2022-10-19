import FormValidator from '../components/FormValidator.js'; // ( + )
import Section  from '../components/Section.js'; // ( + )
import Card from '../components/Card.js'; // ( + )
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';

import arrBaseCards from '../utils/cards.js'; // ( + )



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

const formValidators = {}

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

const popupList = Array.from(document.querySelectorAll('.popup'));

// -----------------------------------------------------------------------------------------

// -------- Создание классов Попапов

const popupFullImg = new PopupWithImage('.popup_back-opacity_9');
popupFullImg.setEventListeners();

const formProfile1 = new PopupWithForm(handleProfileFormSubmit ,'.profile-popup');
formProfile1.setEventListeners();
//-----------------------------------------------------------------------------------
const formNewCard1 = new PopupWithForm(handleAddCardSubmit,'.card-popup');
formNewCard1.setEventListeners();

// ---------------------------------


// -------- Создание объекта Section

const addingCards = new Section({
    items: arrBaseCards,
    renderer: (objTitleLink) => {
        const elementTemplate = new Card(objTitleLink, () => {
            popupFullImg.open(objTitleLink);
        }, '.element-template');
        const cardElement = elementTemplate.generateCard();
        return cardElement;
    }
}, '.elements');

addingCards.renderItems();

// ---------------------------------

// -------- Функция для создание новой карточки из Формы по событию Submit

function handleAddCardSubmit(evt, obj) {
    evt.preventDefault();

    const elementTemplate = new Card({
        name: obj['title'],
        link: obj['link']
    }, () => {popupFullImg.open(obj);}, '.element-template');

    const cardElement = elementTemplate.generateCard();

    addingCards.addItem(cardElement);

    formNewCard1.close();
}

// -------------------------------------------------------

// -------- Создание валидации для форм объектом FormValidator

const setValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector))
    formList.forEach((formElement) => {
      const validator = new FormValidator(config, formElement);
      const formName = formElement.getAttribute('name');
  
      formValidators[formName] = validator;
      validator.enableValidation();
    });
  };
  
  setValidation(namesForValidation);
  
  // ----------------------------------------------------------

function getFormName(popup) {
    return popup.querySelector('.popup__form').getAttribute('name');
}

function handleProfileFormSubmit(evt, arr) {
    evt.preventDefault();

    profileName.textContent = arr['name'];
    profileProfession.textContent = arr['profession'];
    formProfile1.close();
}


editButton.addEventListener('click', () => {
    formProfile1.open();
    formValidators[getFormName(popupProfile)].resetValidation();
});

addButton.addEventListener('click', () => {
    formNewCard1.open();
    formValidators[getFormName(popupNewCard)].resetValidation();
});