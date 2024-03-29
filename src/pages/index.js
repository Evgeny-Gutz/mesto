import './index.css';
import FormValidator from '../scripts/components/FormValidator.js';
import Section  from '../scripts/components/Section.js';
import Card from '../scripts/components/Card.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js';
import {selectors, namesForValidation} from '../scripts/utils/constants.js';

const popupProfileElement = document.querySelector(selectors.blockPopup.popupProfile),
      popupProfileName = popupProfileElement.querySelector(selectors.blockPopup.profName),
      popupProfileProfession = popupProfileElement.querySelector(selectors.blockPopup.profJob);

const popupNewCardElement = document.querySelector(selectors.blockPopup.popupNewCard);

const popupChangeAvatar = document.querySelector('.avatar-popup');

const profile = document.querySelector(selectors.blockProfile.profile),
      profileAvatar = profile.querySelector(selectors.blockProfile.avatar),
      pencilAvatar = profile.querySelector('.profile__change-avatar'),
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
    selectorAboutPerson: selectors.blockProfile.profession,
    selectorAvatar: selectors.blockProfile.avatar
};

const popupFullImg = new PopupWithImage(selectors.blockPopup.popupFullImg);
const formProfile = new PopupWithForm(selectors.blockPopup.popupProfile, handleProfileFormSubmit);
const formNewCard = new PopupWithForm(selectors.blockPopup.popupNewCard, handleAddCardSubmit);
const popupDeletCard = new PopupWithForm('.card-delete');
const popupAvatar = new PopupWithForm('.avatar-popup', handleChengeAvatar);
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

function handleChengeAvatar(src) {
    api.changeAvatarProfil(src.link)
        .then(res => {
            user.setUserInfo(res);
            popupAvatar.close();
        })
        .catch(res => {
            console.log(`Произошла ошибка:${res} при смене изображения аватара`);
        })
        .finally(() => {
            popupAvatar.changeSubmitValue('Сохранить');
        })
}

function handleAddCardSubmit(obj) {
    const objTitleLinkNew = {
        name: obj['title'],
        link: obj['link']
    };
    api.addNewCard(objTitleLinkNew)
        .then( (res) => {
            const card = createCard({
                name: res.name,
                link: res.link,
                counter: res.likes.length,
                id: res._id,
                userId: user.getUserId(),
                ownerId: res.owner._id,
                likes: res.likes
            });
            addingCards.prependItem(card);
            formNewCard.close();
        })
        .catch(res => {
            console.log(`Произошла ошибка: ${res} при попытке добавления новой карточки`);
        })
        .finally(() => {
            formNewCard.changeSubmitValue('Создать');
        })
}

function handleProfileFormSubmit(obj) {
    api.changeDataProfil({name:obj.name, about:obj.profession})
        .then( (res => {
            user.setUserInfo(res);
            formProfile.close();
        }))
        .catch(res => {
            console.log(`Произошла ошибка: ${res} при отправе сабмита формы изменения данных пользователя`);
        })
        .finally(() => {
            formProfile.changeSubmitValue('Сохранить');
        })
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
                        popupDeletCard.changeSubmitValue('Да');
                    })
                    .catch(res => {
                        console.log(`Произошла ошибка: ${res} при попытке удаления карточки`);
                    })
            })
        },
        (id) => {
            if(newCard.checkingMyLike()) {
                api.deleteLike(id)
                .then(res => {
                    newCard.changeLike(res.likes);
                })
                .catch(res => {
                    console.log(`Произошла ошибка: ${res} при попытке удаления лайка`);
                })
            } else {
                api.setLike(id)
                .then(res => {
                    newCard.changeLike(res.likes);
                })
                .catch(res => {
                    console.log(`Произошла ошибка: ${res} при попытке установить лайк`);
                })
            }
        },
        selectors.elementTemplate);
    const cardElement = newCard.generateCard();
    return cardElement;
}

function getFormName(popup) {
    return popup.querySelector(selectors.form).getAttribute('name');
}

function getDataUser() {
    return api.getDataUser()
    .then(dataProfile => {
        user.setUserInfo(dataProfile);
        return user;
    })
    .catch(err => {
        console.log(err);
    })
}

function getCards() {
    return api.getInitialCards()
    .then(cardsList => {
        const arr = [];
        cardsList.forEach(elem => {
            arr.push({
                name: elem.name,
                link: elem.link,
                counter: elem.likes.length,
                id: elem._id,
                ownerId: elem.owner._id,
                likes: elem.likes
            })
        })
        return arr;
    })
    .catch(err => {
        console.log(err);
    })
}

popupDeletCard.setEventListeners();
popupFullImg.setEventListeners();
formProfile.setEventListeners();
formNewCard.setEventListeners();
popupAvatar.setEventListeners();
setValidation(namesForValidation);

pencilAvatar.addEventListener('click', () => {
    popupAvatar.open();
    formValidators[getFormName(popupChangeAvatar)].resetValidation();
})

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

Promise.all([getDataUser(), getCards()])
    .then( ([user, cards]) => {
        cards.forEach( elem => {
            elem.userId = user.getUserId();
        })
        addingCards.renderItems(cards);
    })
    .catch(err => {
        console.log(err);
    })