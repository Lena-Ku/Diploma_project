import React from 'react';
import photo from '../../images/about__photo.jpg';


function About() {

    return (
        <>
            <section className="about">
                <img className="about__photo" src={photo} alt="Фотография пользователя" />
                <div className="about__info">
                    <h2 className="about__header">Об авторе</h2>
                        <p className="about__text"> Выпускник факультета web-разработки Яндекс.Практикума - Елена. 
                        Сайт предоставляет возможность поиска актуальных новостей по ключевым словам. Для того, чтобы не потерять 
                        новость после регистрации пользователя есть возможность добавления/удаления новостей в "сохраненные".  
                             </p>
                        <p className="about__text">Если предпочитаете искать и читать новости в пути на работу/домой, сайт оптимизирован 
                        для просмотра с любых устройств: телефон, планшет. 
                        </p>
                </div>
            </section>
        </>
    )
}

export default About;
