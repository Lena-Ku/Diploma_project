import { TIME_OF_SEARCH } from './constants.js';

class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
        
        const pastDate = new Date();
        const previousDate = pastDate.getDate() - TIME_OF_SEARCH;
        pastDate.setDate(previousDate)

        this._pastDate = pastDate;
        this._nowDate = new Date();
        this._apiKey = 'f333d8cb94134ca2859f568c9a0cc97a';
        this._pageSize = 100;
    }

    getNews(kewWord) {
        return fetch(`${this._url}?q=${kewWord}&apiKey=${this._apiKey}&from=${this._pastDate}
        &to=${this._nowDate}&pageSize=${this._pageSize}`, {
            method: 'GET',        
        })
        .then((res) => {
            if(res.ok) {
                return res.json();
            } 
                return Promise.reject(new Error(`Ошибка: ${res.status}`));
        })
    }
}

const NewsApi = new Api({
    url: 'https://nomoreparties.co/news/v2/everything',
    headers: {
      'Content-Type': 'application/json',
    }
  })

export default NewsApi;
