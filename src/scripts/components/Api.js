export default class Api {
    constructor({url, headers}) {
        this._url = url;
        this._headers = headers;
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers
        })
        .then(res => {
            return (res.ok) ? res.json(): Promise.reject(`Ошибка: ${res.status}`);
        })
        // .then(res => {
        //     const baseCards = [];
        //     res.forEach((elem => {
        //         let obj = {};
        //         obj.name = elem.name;
        //         obj.link = elem.link;
        //         baseCards.push(obj);
        //     }))
        //     return baseCards;
        // })
        
    }

    getDataUser() {
        return fetch(this._baseUrl + '/users/me', this._options)
        .then(res => {
            if(res.ok) return res.json();
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch(err => {
            console.log(err);
        })
    }

    saveDataUser() {
        return fetch(this._baseUrl + '/users/me', this._options)
        .then(res => {
            if(res.ok) return res.json();
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch(err => {
            console.log(err);
        })
    }
}