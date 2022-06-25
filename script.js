let popupElem = document.querySelector('.popup-block');
let popupOpacity = popupElem.querySelector('.popup-block__opacity');
let formElement = popupElem.querySelector('.popup-block__form');
let formCross = formElement.querySelector('.popup-block__cross');
let textInputs = formElement.querySelectorAll('.popup-block__input_type_text');

let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');
let profileEditButton = document.querySelector('.profile__edit-button');

let inputName = textInputs[0];
let inputProfession = textInputs[1];
inputName.value = profileName.textContent;
inputProfession.value = profileProfession.textContent;
  
formCross.addEventListener('click', closePopup);
popupOpacity.addEventListener('click', closePopup);

profileEditButton.addEventListener('click', openPopup);
formElement.addEventListener('submit', formSubmitHandler);

function closePopup () {
    inputName.value = profileName.textContent;
    inputProfession.value = profileProfession.textContent;
    popupElem.style.display = 'none';
}

function openPopup () {
    popupElem.style.display = 'flex';
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileProfession.textContent = inputProfession.value;
    popupElem.style.display = 'none';
}
 