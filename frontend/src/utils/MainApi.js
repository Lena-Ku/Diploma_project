export const BASE_URL = 'https://www.api.favorite-news.students.nomoreparties.space';

export const register = (email, password, name) => {

    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, name })
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(new Error(`Ошибка: ${res.status}`));
        })
}

export const authorize = (email, password) => {

    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        },
        body: JSON.stringify({ email, password })
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(new Error(`Ошибка: ${res.status}`));
        })

        .then((res) => {
            if (res.token) {
                localStorage.setItem('jwt', res.token);
                return res;
            } else {
                return;
            }
        })
}

export const getUser = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(new Error(`Ошибка: ${res.status}`));
        })
        .then(data => data)
}

export const getArticles = (token) => {
    return fetch(`${BASE_URL}/articles`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(new Error(`Ошибка: ${res.status}`));
        })
        .then(data => data)
}

export const saveArticle = (card, token) => {
    return fetch(`${BASE_URL}/articles`, {
        method: 'POST',
        body: JSON.stringify(card), 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(new Error(`Ошибка: ${res.status}`));
        })
        .then(data => data)
}

export const deleteArticle = (id, token) => {
    return fetch(`${BASE_URL}/articles/${id}`, {
        method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(new Error(`Ошибка: ${res.status}`));
        })
}




