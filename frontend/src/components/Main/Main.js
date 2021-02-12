import React from 'react';
import SearchForm from '../SearchForm/SearchForm.js';
import About from '../About/About.js';
import NewsCardList from '../NewsCardList/NewsCardList.js';
import Preloader from '../Preloader/Preloader.js';
import ErrorRequest from '../ErrorRequest/ErrorRequest.js';
import NewsNotFound from '../NewsNotFound/NewsNotFound.js';


function Main({ handleClick, loggedIn, search, setSearch, handleSearchSubmit, cards, load, errReq, 
    showMoreCards, numberOfCards, newsNotFound, articles, handleDeleteClick, setPopupLoginOpen }) {

    return (
        <>
            <main className="main">
                <h1 className="main__header">Что творится в мире?</h1>
                <p className="main__text">Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</p>

                <SearchForm
                    search={search}
                    setSearch={setSearch}
                    handleSearchSubmit={handleSearchSubmit} />

                <Preloader
                    load={load}
                />

                <ErrorRequest
                    errReq={errReq}
                />

                <NewsNotFound
                    newsNotFound={newsNotFound} />

                <NewsCardList
                    handleClick={handleClick}
                    loggedIn={loggedIn}
                    cards={cards}
                    load={load}
                    errReq={errReq}
                    showMoreCards={showMoreCards}
                    numberOfCards={numberOfCards}
                    newsNotFound={newsNotFound}
                    search={search}
                    articles={articles}
                    handleDeleteClick={handleDeleteClick}
                    setPopupLoginOpen={setPopupLoginOpen}
                />

                <About />

            </main>
        </>
    )
}

export default Main;