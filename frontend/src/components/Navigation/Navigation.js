import React from 'react';
import { Link } from "react-router-dom";
import GHLink from '../../images/navigation__link-gh.svg';
import FBLink from '../../images/navigation__link-fb.svg';

function Navigation() {

    return (
        <>
            <nav className="navigation">
                <div className="navigation__items">
                    <Link to="/" className="navigation__text">Главная</Link>
                    <a href="https://praktikum.yandex.ru/" target="blank" className="navigation__text">Яндекс.Практикум</a>
                </div>
                <ul className="navigation__links">
                    <li className="navigation__link">
                        <a href="https://github.com/" target="blank"><img className="navigation__link" alt="Иконка ГитХаб" src={GHLink}></img></a>
                    </li>
                    <li className="navigation__link">
                        <a href="https://www.facebook.com/" target="blank"><img className="navigation__link" alt="Иконка Фейсбук" src={FBLink}></img></a>
                    </li>
                </ul>

            </nav>
        </>
    )
}

export default Navigation;