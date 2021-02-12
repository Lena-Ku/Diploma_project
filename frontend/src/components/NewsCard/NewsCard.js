import React, { useContext } from 'react';
import { useLocation } from "react-router-dom";
import { CurrentUserContext } from '../../context/CurrentUserContext';

function NewsCard({ card, handleClick, id, handleDeleteClick, setPopupLoginOpen }) {

    const currentUser = useContext(CurrentUserContext);
    const location = useLocation();

    function deleteCardClick() {
        handleDeleteClick(card._id);
    }

    function onSaveButton() {
        if (!currentUser.name) {
            setPopupLoginOpen(true)
        }
        if (id) {
           handleDeleteClick(id)
        } 

        if (currentUser.name) {
            handleClick(card)
        }
    }

   const date = card.date;
    const cardDate = new Date(date).toLocaleString('ru', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })

    return (

        <figure className="card">
            <img className="card__photo" src={card.image} alt="Фотография карточки" />
            {
                location.pathname === '/' &&
                <div className="card__tooltip">
                    <button className={`card__saved card__saved_${id && currentUser.name ? "active" : "hidden"} 
                card__saved_${id && !currentUser.name && "not-loggedIn"}`}
                        type="button" onClick={onSaveButton}></button>
                    {
                        !currentUser.name && <div className="card__saved-info">
                            <p className="card__saved-text">Войдите, чтобы сохранять статьи</p>
                        </div>
                    }
                </div>
            }
            {
                location.pathname === '/saved-news' &&
                <>
                    <div className="card__tooltip">
                        <button className="card__delete" type="button" onClick={deleteCardClick}></button>
                        <div className="card__delete-info">
                            <p className="card__saved-text">Убрать из сохранённых</p>
                        </div>
                    </div>
                    <div className="card__theme">
                        <p className="card__theme-text">{card.keyword}</p>
                    </div>
                </>
            }

            <div className="card__info">
                <p className="card__date">{cardDate}</p>
                <a className="card__link" href={card.link} target="blank"><h3 className="card__title" src={card.link} target="blank">{card.title}</h3></a>
                <p className="card__text">{card.text}</p>
            </div>
            <p className="card__source">{card.source}</p>
        </figure>
    )
}

export default NewsCard;
