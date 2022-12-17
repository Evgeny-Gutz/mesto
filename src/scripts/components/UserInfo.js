export default class UserInfo {
    constructor({selectorNamePerson, selectorAboutPerson, selectorAvatar}) {
        this._nameElement = document.querySelector(selectorNamePerson);
        this._professionElement = document.querySelector(selectorAboutPerson);
        this._avatar = document.querySelector(selectorAvatar);
        this._userId = 1;
    }

    getUserInfo() {
        this._dataPerson = {};
        this._dataPerson.name = this._nameElement.textContent;
        this._dataPerson.profession = this._professionElement.textContent;
        this._dataPerson.avatar = this._avatar;
        this._dataPerson.userId = this._userId;
        return this._dataPerson;
    }

    setUserInfo(newDataPerson) {
        this._nameElement.textContent = newDataPerson['name'];
        this._professionElement.textContent = newDataPerson['profession'];
        this._avatar = newDataPerson['avatar'];
        this._userId = newDataPerson['id'];
    }
}