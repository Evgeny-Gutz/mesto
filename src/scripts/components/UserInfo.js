export default class UserInfo {
    constructor({selectorNamePerson, selectorAboutPerson}) {
        this._nameElement = document.querySelector(selectorNamePerson);
        this._professionElement = document.querySelector(selectorAboutPerson);
    }

    getUserInfo() {
        this._dataPerson = {};
        this._dataPerson.name = this._nameElement.textContent;
        this._dataPerson.profession = this._professionElement.textContent;
        return this._dataPerson;
    }

    setUserInfo(newDataPerson) {
        this._nameElement.textContent = newDataPerson['name'];
        this._professionElement.textContent = newDataPerson['profession'];
    }
}