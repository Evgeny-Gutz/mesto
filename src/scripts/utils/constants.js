export  const selectors = {
    blockPopup: {
        popupProfile: '.profile-popup', 
        profName: '.popup__input_type_name', 
        profJob: '.popup__input_type_job', 
        popupNewCard: '.card-popup', 
        popupFullImg: '.popup_back-opacity_9'
    },
    blockProfile: {
        profile: '.profile', 
        name: '.profile__name',
        profession: '.profile__profession',
        avatar: '.profile__avatar',
        editButton: '.profile__edit-button', 
        addButton: '.profile__add-button' 
    },
    elements: '.elements',
    elementTemplate: '.element-template',
    form: '.popup__form'
}

export const namesForValidation = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
}