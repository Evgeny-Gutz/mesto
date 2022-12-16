import './index.css';
import FormValidator from './scripts/components/FormValidator.js';
import Section  from './scripts/components/Section.js';
import Card from './scripts/components/Card.js';
import PopupWithImage from './scripts/components/PopupWithImage.js';
import PopupWithForm from './scripts/components/PopupWithForm.js';
import UserInfo from './scripts/components/UserInfo.js';
import Api from './scripts/components/Api.js';
import {selectors, namesForValidation} from './scripts/utils/constants.js';

const popupProfileElement = document.querySelector(selectors.blockPopup.popupProfile),
      popupProfileName = popupProfileElement.querySelector(selectors.blockPopup.profName),
      popupProfileProfession = popupProfileElement.querySelector(selectors.blockPopup.profJob);

const popupNewCardElement = document.querySelector(selectors.blockPopup.popupNewCard);

const profile = document.querySelector(selectors.blockProfile.profile),
      profileAvatar = document.querySelector(selectors.blockProfile.avatar),
      editButton = profile.querySelector(selectors.blockProfile.editButton),
      addButton = profile.querySelector(selectors.blockProfile.addButton);

const formValidators = {};
const apiOptions = {
    url: 'https://nomoreparties.co/v1/cohort-55/',
    headers: {
        authorization: 'fd4b5af0-133d-42b5-9fcc-8b1d210cd42a',
        'Content-Type': 'application/json'
    }
};
const dataUser = {
    selectorNamePerson: selectors.blockProfile.name,
    selectorAboutPerson: selectors.blockProfile.profession
};

const popupFullImg = new PopupWithImage(selectors.blockPopup.popupFullImg);
const formProfile = new PopupWithForm(selectors.blockPopup.popupProfile, handleProfileFormSubmit);
const formNewCard = new PopupWithForm(selectors.blockPopup.popupNewCard, handleAddCardSubmit);
const popupDeletCard = new PopupWithForm('.card-delete');
const addingCards = new Section(createCard, selectors.elements);
const user = new UserInfo(dataUser);
const api = new Api(apiOptions);

const setValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector))
    formList.forEach((formElement) => {
        const validator = new FormValidator(config, formElement);
        const formName = formElement.getAttribute('name');

        formValidators[formName] = validator;
        validator.enableValidation();
    });
};

function handleAddCardSubmit(obj) {
    const objTitleLinkNew = {
        name: obj['title'],
        link: obj['link']
    };
    api.addNewCard(objTitleLinkNew)
        .then( (response) => {
            addingCards.addItem(createCard({name: response.name, link: response.link}));
        })
    
    formNewCard.close();
}

function handleProfileFormSubmit(obj) {
    api.changeDataProfil({name:obj.name, about:obj.profession})
        .then( (res => {
            const obj = {};
            obj.name = res.name;
            obj.profession = res.about;
            user.setUserInfo(obj);
            formProfile.close();
        }))
}

function createCard(obj) {
    const newCard = new Card(
        obj, 
        () => {popupFullImg.open(obj)}, 
        (id) => {
            popupDeletCard.open();
            popupDeletCard.setNewHandleClickSubmit(() => {
                api.deleteCard(id)
                    .then(res => {
                        newCard.removeCard();
                        popupDeletCard.close();
                    })
            })
        },
        selectors.elementTemplate);
    const cardElement = newCard.generateCard();
    return cardElement;
}

function getFormName(popup) {
    return popup.querySelector(selectors.form).getAttribute('name');
}


popupDeletCard.setEventListeners();
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

let userId;    
api.getDataUser()
    .then(dataProfile => {
        user.setUserInfo({
            name: dataProfile.name,
            profession: dataProfile.about
        });
        profileAvatar.src = dataProfile.avatar;
        userId = dataProfile._id;
    })
    .catch(err => {
        console.log(err);
    })

api.getInitialCards()
    .then(cardsList => {
        const arr = [];
        cardsList.forEach(elem => {
            arr.push({
                name: elem.name,
                link: elem.link,
                counter: elem.likes.length,
                id: elem._id,
                userId: userId,
                ownerId: elem.owner._id
            })
        })
        addingCards.renderItems(arr);
    })
    .catch(err => {
        console.log(err);
    })