class Api {
    constructor( {url, headers}) {
        this._url = url;
        this._headers = headers;
    }

    getUser() {
        return fetch(`${this._url}users/me/`, {
            headers: this._headers
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    getCards() {
        return fetch(`${this._url}cards/`, {
            headers: this._headers
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    addLike(item) {
        return fetch(`${this._url}cards/likes/${item._id}`, {
            method: 'PUT',
            headers: this._headers,
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    deleteLike(id) {
        return fetch(`${this._url}cards/likes/${id}`, {
            method: 'DELETE',
            headers: this._headers,
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    deleteCard(id) {
        return fetch(`${this._url}cards/${id}`, {
            method: 'DELETE',
            headers: this._headers,
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    changeUser(item) {
        return fetch(`${this._url}users/me/`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(item)
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    changeAvatar(item) {
        return fetch(`${this._url}users/me/avatar/`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(item)
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    createCard(item) {
        return fetch(`${this._url}cards/`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(item)
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }
}

const api = new Api({
    url: 'http://localhost:3001/', 
    headers: {
        authorization: '3264da94-6a0d-46bd-9eaf-c8758f7396fd',
        'Content-Type': 'application/json'
    }
});

export {api}