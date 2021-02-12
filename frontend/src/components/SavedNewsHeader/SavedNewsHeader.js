import React, { useContext } from 'react';
import { CurrentUserContext } from '../../context/CurrentUserContext';

function SavedNewsHeader({ articles }) {

    const currentUser = useContext(CurrentUserContext);

    const words = articles.map((item) => {
        return item.keyword;
    })

    function uniqeWords(arr) {
        const result = [];

        for (let str of arr) {
            if (!result.includes(str)) {
                result.push(str);
            }
        }
        return result;
    }

    const uniqWords = uniqeWords(words);

    return (
        <section className="saved-news">
            <p className="saved-news__text">Сохранённые статьи</p>
            {
                articles.length === 0 && <h2 className="saved-news__header">{currentUser.name}, у вас нет сохранённых статей</h2>
            }
            {
                articles.length === 1 && <h2 className="saved-news__header">{currentUser.name}, у вас {articles.length} сохранённая статья</h2>
            }
            {
                articles.length >= 2 && articles.length < 5 && <h2 className="saved-news__header">{currentUser.name}, у вас {articles.length} сохранённых статьи</h2>
            }
            {
                articles.length >= 5 && <h2 className="saved-news__header">{currentUser.name}, у вас {articles.length} сохранённых статей</h2>
            }
            {
                uniqWords.length === 1 && <p className="saved-news__key-words">По ключевому слову:
                <span className="saved-news__key-words_bold"> {uniqWords[0]}</span> </p>
            }
            {
                uniqWords.length > 1 && <p className="saved-news__key-words">По ключевым словам:
            <span className="saved-news__key-words_bold"> {uniqWords[0]},</span>
                    <span className="saved-news__key-words_bold"> {uniqWords[1]} </span>
                    {
                        uniqWords.length === 3 && <span className="saved-news__key-words_bold">и еще одному</span>
                    }
                    {
                        uniqWords.length === 4 && <span className="saved-news__key-words_bold">и 2-м другим</span>
                    }
                    {
                        uniqWords.length > 4 && <span className="saved-news__key-words_bold">и другим</span>
                    }
                </p>
            }

        </section>
    )
}

export default SavedNewsHeader;

