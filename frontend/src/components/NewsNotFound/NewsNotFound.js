import React from 'react';
import NoNews from '../../images/no-news__image.svg';

function NewsNotFound({ newsNotFound }) {

    return (
        <>
        {
            newsNotFound && 
            <div className="no-news">
            <img className="no-news__image" src={NoNews} alt="Новости не найдены"/>
            <h3 className="no-news__header">Ничего не найдено</h3>
            <p className="no-news__text">К сожалению по вашему запросу ничего не найдено.</p>
        </div>
        }
        </>
    )
}

export default NewsNotFound;