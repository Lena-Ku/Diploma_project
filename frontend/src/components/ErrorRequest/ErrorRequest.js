import React from 'react';
import NoNews from '../../images/no-news__image.svg';

function ErrorRequest({ errReq }) {

    return (
        <>
        {
            errReq && <div className="no-news">
            <img className="no-news__image" src={NoNews} alt="Новости не найдены"/>
            <h3 className="no-news__header">Во время запроса произошла ошибка</h3>
            <p className="no-news__text">Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</p>
        </div>
        }
        </>
    )
}

export default ErrorRequest;