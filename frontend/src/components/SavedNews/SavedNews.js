import React from 'react';
import NewsCard from '../NewsCard/NewsCard.js';

function SavedNews({ articles, handleDeleteClick }) {

    return (
        <section className="saved-articles">
            {
                articles && articles.map((item) => (
                    <NewsCard
                        key={item._id}
                        card={item}
                        handleDeleteClick={handleDeleteClick}
                    />))
            }
        </section>
    )
}

export default SavedNews;
