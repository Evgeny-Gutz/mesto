export default class Api {
    constructor({url, headers}) {
        this._url = url;
        this._headers = headers;
    }

    getDataUser() {
        return fetch(this._setUrl('users/me'),{
            headers: this._headers
        })
        .then(res => {
            return this._returnResult(res);
        })
    }

    getInitialCards() {
        return fetch(this._setUrl('cards'), {
            headers: this._headers
        })
        .then(res => {
            return this._returnResult(res);
        })
    }

    addNewCard({name, link}) {
        return fetch(this._setUrl('cards'),{
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({name, link})
        })
        .then(res => {
            return this._returnResult(res);
        })
    }

    changeDataProfil({name, about}) {
        return fetch(this._setUrl('users/me'),{
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
        .then(res => {
            return this._returnResult(res);
        })
    }

    deleteCard(id) {
        return fetch(this._setUrl(`cards/${id}`),{
            method: 'DELETE',
            headers: this._headers
        })
        .then(res => {
            return this._returnResult(res);
        })
    }

    _setUrl(urlEnding) {
        return `${this._url}${urlEnding}`;
    }

    _returnResult(res) {
        return (res.ok) ? res.json(): Promise.reject(`Ошибка: ${res.status}`);
    }
}