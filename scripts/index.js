let popupElem = document.querySelector('.popup');
let formElement = popupElem.querySelector('.popup__form');
let formCross = document.querySelector('.popup__cross');

let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');
let profileEditButton = document.querySelector('.profile__edit-button');

let inputName = formElement.querySelector(".popup__input[name='name']");
let inputProfession = formElement.querySelector(".popup__input[name='profession']");

// Перед работой торопился, скрипт переделать не успел, проверте код без скрипта.... Спасибо.

formCross.addEventListener('click', closePopup());
popupElem.addEventListener('click', closePopup());
console.log(inputName);

popupElem.addEventListener('keydown', function(event) {
      if (event.code == 'Enter') {
        inputName.value = profileName.textContent;
        inputProfession.value = profileProfession.textContent;
        popupElem.style.display = 'none';
      }
    });

profileEditButton.addEventListener('click', openPopup);
formElement.addEventListener('submit', formSubmitHandler);

function closePopup () {
    inputName.value = profileName.textContent;
    inputProfession.value = profileProfession.textContent;
    popupElem.style.display = 'none';
}

function openPopup () {
    popupElem.style.display = 'flex';
    inputName.value = profileName.textContent;
    inputProfession.value = profileProfession.textContent;
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileProfession.textContent = inputProfession.value;
    popupElem.style.display = 'none';
}
 