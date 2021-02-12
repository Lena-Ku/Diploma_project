import React from 'react';
import NewsCard from '../NewsCard/NewsCard.js';

function NewsCardList({ handleClick, loggedIn, cards, load, errReq, numberOfCards, showMoreCards, newsNotFound, 
    search, articles, handleDeleteClick, setPopupLoginOpen }) {

    return (
        <> {
            cards && !load && !errReq && !newsNotFound && cards.length !== 0 &&

            <section className="cards">
                <h2 className="cards__header">Результаты поиска</h2>
                <div className="cards__list">
                    {
                        cards && cards.map((item, i) => (
                            i < numberOfCards &&
                            <NewsCard
                                key={i}
                                loggedIn={loggedIn}
                                handleClick={handleClick}
                                card={item}
                                search={search}
                                handleDeleteClick={handleDeleteClick}
                                setPopupLoginOpen={setPopupLoginOpen}
                                id={articles.find((art) => art.title===item.title)?._id}
                            />))
                    }
                </div>
                {
                    cards && cards.length > numberOfCards ?
                    <button className="cards__more" onClick={showMoreCards}>Показать еще</button>

                    : null
                }
                

            </section>
            
        }
        </>
    )
}

export default NewsCardList;