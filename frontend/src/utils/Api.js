class Api {
    constructor( {url} ) {
        this._url = url;
    }

    getCards() {
        const token = localStorage.getItem('jwt');
        return fetch(`${this._url}cards/`, {
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    deleteCard(id) {
        const token = localStorage.getItem('jwt');
        return fetch(`${this._url}cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    createCard(item) {
        const token = localStorage.getItem('jwt');
        return fetch(`${this._url}cards/`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
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
    url: 'https://api.seriojakarelin.students.nomoredomains.work/', 
});

export {api}