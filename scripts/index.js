let popupElem = document.querySelector('.popup'),
    inputName = popupElem.querySelector('.popup__input_type_name'),
    inputProfession = popupElem.querySelector('.popup__input_type_job'),
    popupForm = popupElem.querySelector('.popup__form'),
    formSubmit = popupElem.querySelector('.popup__submite'),
    formCross = popupElem.querySelector('.popup__cross');

let profileName = document.querySelector('.profile__name'),
    profileProfession = document.querySelector('.profile__profession'),
    editButton = document.querySelector('.profile__edit-button');

editButton.addEventListener('click', openPopup);

formCross.addEventListener('click', visibilityChange);

formSubmit.addEventListener('click', visibilityChange)

popupForm.addEventListener('submit', formSubmitHandler);

popupElem.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup__opened')) {
        visibilityChange();
    }
})

function openPopup () {
    inputName.value = profileName.textContent;
    inputProfession.value = profileProfession.textContent;
    visibilityChange ();
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileProfession.textContent = inputProfession.value;
}

function visibilityChange () {
    popupElem.classList.toggle('popup__opened');
}