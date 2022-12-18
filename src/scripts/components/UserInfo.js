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
        this._dataPerson.avatar = this._avatar.src;
        this._dataPerson.userId = this._userId;
        return this._dataPerson;
    }

    setUserInfo({name, about, avatar, _id}) {
        this._nameElement.textContent = name;
        this._professionElement.textContent = about;
        this._avatar.src = avatar;
        this._userId = _id;
    }

    getUserId() {
        return this._userId;
    }
}