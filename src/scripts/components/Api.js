export default class Api {
    constructor({url, headers}) {
        this._url = url;
        this._headers = headers;
    }

    getDataUser() {
        return this._request('users/me', {
            headers: this._headers
        });
    }

    getInitialCards() {
        return this._request('cards', {
            headers: this._headers
        });
    }

    addNewCard({name, link}) {
        return this._request('cards', {
                method: 'POST',
                headers: this._headers,
                body: JSON.stringify({name, link})
            });
    }

    changeDataProfil({name, about}) {
        return this._request('users/me', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        });
    }

    changeAvatarProfil(avatar) {
        return this._request('users/me/avatar', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatar
            })
        });
    }

    deleteCard(id) {
        return this._request(`cards/${id}`, {
            method: 'DELETE',
            headers: this._headers
        });
    }

    setLike(id) {
        return this._request(`cards/${id}/likes`, {
            method: 'PUT',
            headers: this._headers
        });
    }

    deleteLike(id) {
        return this._request(`cards/${id}/likes`, {
            method: 'DELETE',
            headers: this._headers
        });
    }

    _returnResult(res) {
        return (res.ok) ? res.json(): Promise.reject(`Ошибка: ${res.status}`);
    }

    _request(url, options) {
        return fetch(`${this._url}${url}`, options).then(this._returnResult)
    }

}