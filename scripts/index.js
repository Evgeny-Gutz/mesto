const selectors = {
    block_popup: {
        popup: '.popup',
        inputName: '.popup__input_type_name',
        inputJob: '.popup__input_type_job',
        inputTitle: '.popup__input_type_title',
        inputLink: '.popup__input_type_link',
        formProfile: '.popup__form[name="profile-data"]',
        formNewCard: '.popup__form[name="new-card"]',
        cross: '.popup__cross'
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

// 0. Немного изменил доступ к селекторам

const popupProfile = document.querySelector(selectors.block_popup.formProfile).parentElement.parentElement,
      crossProfile = popupProfile.querySelector(selectors.block_popup.cross),
      formProfile = popupProfile.querySelector(selectors.block_popup.formProfile),
      inputName = formProfile.querySelector(selectors.block_popup.inputName),
      inputJob = formProfile.querySelector(selectors.block_popup.inputJob);

const popupNewCard = document.querySelector(selectors.block_popup.formNewCard).parentElement.parentElement,
      crossNewCard = popupNewCard.querySelector(selectors.block_popup.cross),
      formNewCard = popupNewCard.querySelector(selectors.block_popup.formNewCard),
      inputTitle = popupNewCard.querySelector(selectors.block_popup.inputTitle),
      inputLink = popupNewCard.querySelector(selectors.block_popup.inputLink);

const profile = document.querySelector(selectors.block_profile.profile),
      profileName = profile.querySelector(selectors.block_profile.name),
      profileProfession = profile.querySelector(selectors.block_profile.profession),
      editButton = profile.querySelector(selectors.block_profile.editButton),
      addButton = profile.querySelector(selectors.block_profile.addButton);

const elements = document.querySelector(selectors.block_elements.elements);

editButton.addEventListener('click', openPopup);
crossProfile.addEventListener('click', () => popupProfile.classList.remove('popup_opened'));
formProfile.addEventListener('submit', formProfileSubmitHandler);

// Задание 1. Шесть карточек «из коробки»:

const initialCards = [
{
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
},
{
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
},
{
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
},
{
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
},
{
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
},
{
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
}
]; 

initialCards.forEach((item) => {
    const elementTemplate = createTemplateCard(item);
    elements.append(elementTemplate);
})


// Задание 2. Форма добавления карточки.Сделайте так, чтобы форма открывалась нажатием на кнопку «+» и закрывалась кликом на крестик:

addButton.addEventListener('click', () => popupNewCard.classList.add('popup_opened'));
crossNewCard.addEventListener('click', () => popupNewCard.classList.remove('popup_opened'));


// Задание 3. Добавление карточки:

formNewCard.addEventListener('submit', formNewCardSubmitHandler);

function formNewCardSubmitHandler (evt) {
    evt.preventDefault();
    const obj = {};
    obj.name = inputTitle.value;
    obj.link = inputLink.value;
    const elementTemplate = createTemplateCard(obj);

    elements.prepend(elementTemplate);
    popupNewCard.classList.remove('popup_opened');
}


// Задание 4. Лайк карточки:
// Задание 5. Удаление карточки:

function createTemplateCard (item) {
    const elementTemplate = document.querySelector(selectors.block_templates.element).content.querySelector('.element').cloneNode(true);
    const img = elementTemplate.querySelector('.element__img');
    const h4 = elementTemplate.querySelector('.element__text');
    const like = elementTemplate.querySelector('.element__like');
    const deleteCard = elementTemplate.querySelector('.element__delete-icon');

    h4.textContent = item.name;
    img.src = item.link;
    img.alt = item.name;
    img.addEventListener('click', createNewFullFigure);
    like.addEventListener('click', () => like.classList.toggle('element__like_active')); // <=  Добавление лайка.
    deleteCard.addEventListener('click', () => deleteCard.closest('.element').remove()); // <=  Удаление карточки.

    return elementTemplate;
}


// Задание 6. Открытие попапа с картинкой:

function createNewFullFigure (evt) {
    const rootNode = document.querySelector('.root');
    const figureTemplate = document.querySelector(selectors.block_templates.figure).content.querySelector('.figure').cloneNode(true);
    const cross = figureTemplate.querySelector('.figure__cross');
    const img = figureTemplate.querySelector('.figure__img');
    const figcaption = figureTemplate.querySelector('.figure__img-name');

    img.src = evt.target.src;
    img.alt = evt.target.alt;
    figcaption.textContent = evt.target.nextElementSibling.querySelector('.element__text').textContent;
    cross.addEventListener('click', () => cross.closest('.figure').remove()); 

    rootNode.prepend(figureTemplate);
}


// Задание 7. Плавное открытие и закрытие попапов:
// В popup.css добавил свойство - transition: visibility .3s linear, opacity .3s linear;



function openPopup () {
    inputName.value = profileName.textContent;
    inputJob.value = profileProfession.textContent;
    popupProfile.classList.add('popup_opened');
}

function formProfileSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileProfession.textContent = inputJob.value;
    popupProfile.classList.remove('popup_opened');
}