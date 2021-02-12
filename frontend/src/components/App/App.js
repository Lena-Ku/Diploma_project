import React, { useState, useEffect } from 'react';
import { Route, Switch, withRouter, useHistory } from 'react-router-dom';
import Header from '../Header/Header.js';
import Main from '../Main/Main.js';
import Footer from '../Footer/Footer.js';
import { CurrentUserContext } from '../../context/CurrentUserContext.js';
import SavedNews from '../SavedNews/SavedNews.js';
import Register from '../Register/Register.js';
import Login from '../Login/Login.js';
import InfoTooltip from '../InfoTooltip/InfoTooltip.js';
import { useForm } from 'react-hook-form';
import NewsApi from '../../utils/NewsApi.js';
import * as auth from '../../utils/MainApi.js';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.js';
import { NUMBER_OF_CARDS } from '../../utils/constants.js';

function App() {

    const [loggedIn, setLoggedIn] = useState(false);
    const [currentUser, setcurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [popupRegisterOpen, setPopupRegisterOpen] = useState(false);
    const [popupLoginOpen, setPopupLoginOpen] = useState(false);
    const [registerOk, setRegisterOk] = useState(false);
    const [mobileView, setMobileView] = useState(false);
    const [search, setSearch] = useState('');
    const [load, setLoad] = useState(false);
    const [errReq, setErrReq] = useState(false);
    const [numberOfCards, setNumberOfCards] = useState(NUMBER_OF_CARDS);
    const [newsNotFound, setNewsNotFound] = useState(false);
    const [successfulReg, setSuccessfulReg] = useState(true);
    const [saveArticle, setSaveArticle] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false)
    const history = useHistory();

    // Валидация формы регистрации
    const { register, errors, handleSubmit, clearErrors } = useForm({
        reValidateMode: 'onBlur',
        mode: 'onBlur',
    });

    // Валидация формы входа
    const {
        register: regLogin,
        errors: errLogin,
        handleSubmit: submitLogin,
        clearErrors: clearErrorsLogin,
    } = useForm({
        reValidateMode: 'onBlur',
        mode: 'onBlur',
    });

    // Загрузка данных пользователя и новостей
    useEffect(() => {
        const articles = JSON.parse(localStorage.getItem('articles'));
        const token = localStorage.getItem('jwt');
        const routerState = history.location.state;

        if (token) {
            Promise.all([
                auth.getUser(token),
                auth.getArticles(token)
            ])
                .then(([user, news]) => {
                    setcurrentUser(user);
                    setLoggedIn(true);
                    setSaveArticle(news)
                })
                .catch((err) => {
                    if (err.message === 'Ошибка: 500') {
                        console.log('На сервере неполадки')
                    }
                })
        }

        // Загрузка новостей по последнему поиску
        if (articles) {
            setCards(articles)
        }

        // Перенаправление пользователя и открытие попапа входа
         if (routerState && routerState.noAuthRedirected && history.action === "REPLACE") {
             setPopupLoginOpen(true);
         }

        function handleEsc(evt) {
            if (evt.key === 'Escape') {
                closeAllPopups()
            }
        }
        document.addEventListener('keydown', handleEsc)
        return () => window.removeEventListener('keydown', handleEsc)

    }, [])

    // Сохранение новостной статьи
    function handleSaveArtical(card) {
        const token = localStorage.getItem('jwt');
        auth.saveArticle(card, token)
            .then((data) => {
                setSaveArticle([...saveArticle, data]);
            })
            .catch((err) => console.log(err))

    }

    // Удаление ноовостной статьи из избранного
    function handleDeleteArticle(id) {
        const token = localStorage.getItem('jwt');
        auth.deleteArticle(id, token)
            .then((card) => {
                const newCards = saveArticle.filter((item) => item._id !== card._id)
                setSaveArticle(newCards);
            })
            .catch((err) => console.log(err))
    }

    // Открытие попапа регистрации
    function handleRegister(e) {
        e.preventDefault()
        setSuccessfulReg(true);
        setMobileView(false)
        setPopupLoginOpen(false)
        setPopupRegisterOpen(true);
        setEmail('');
        setPassword('');
        setName('');
    }

    // Открытие попапа входа 
    function handleLogin(e) {
        e.preventDefault()
        setPopupRegisterOpen(false)
        setRegisterOk(false)
        setPopupLoginOpen(true);
    }

    // Закрытие всех попапов
    function closeAllPopups() {
        clearErrors()
        clearErrorsLogin()
        setPopupLoginOpen(false)
        setPopupRegisterOpen(false)
        setRegisterOk(false)
    }

    // Показ попапа успушной регистрации
    function showRegisterOk() {
        setPopupRegisterOpen(false);
        setRegisterOk(true);
        setIsSubmitting(false);
    }

    // Регистрации на сайте
    function handleSubmitRegister() {
        setIsSubmitting(true)
        auth.register(email, password, name)
            .then((res) => {
                if (res) {
                    showRegisterOk();
                }
            })
            .catch((err) => {
                if (err.message === 'Ошибка: 400') {
                    console.log('Не передано одно из полей')
                }
                if (err.message === 'Ошибка: 409') {
                    setSuccessfulReg(false);
                }
            })
    }

    // Вход на сайт
    function handleSubmitLogin() {
        setIsSubmitting(true)
        auth.authorize(email, password)
            .then((data) => {
                localStorage.setItem('jwt', data.token)
                if (data.token) {
                    setLoggedIn(true);

                    auth.getUser(data.token)
                        .then((res) => {
                            setcurrentUser(res)
                        })
                        .catch((err) => console.log(err))

                    auth.getArticles(data.token)
                        .then((articles) => {
                            setSaveArticle(articles)
                        })
                        .catch((err) => console.log(err))

                    setIsSubmitting(false)
                    closeAllPopups();
                }
            })
            .catch((err) => {
                if (err.message === 'Ошибка: 400') {
                    console.log('Не передано одно из полей')
                }
                if (err.message === 'Ошибка: 401') {
                    setSuccessfulReg(false);
                }
            })
    }

    // Выход
    function handleLogOut() {
        setLoggedIn(false);
        setCards([]);
        setSaveArticle([]);
        localStorage.removeItem('jwt');
        localStorage.removeItem('articles');
        history.push('/');
    }

    // Просмотр мобильной версии сайта
    function handleMobileView() {
        setMobileView(true)
    }

    function handleInfoClose() {
        setMobileView(false)
    }

    // Поиск новостей
    function handleSearchSubmit(e) {
        e.preventDefault();
        setNewsNotFound(false)
        setErrReq(false)
        setNumberOfCards(3);
        setLoad(true)
        NewsApi.getNews(search)
            .then((data) => {
                const newData = data.articles.map((article) => ({
                    keyword: search,
                    title: article.title,
                    text: article.description,
                    date: article.publishedAt,
                    source: article.source.name,
                    link: article.url,
                    image: article.urlToImage,
                }))

                setCards(newData)
                localStorage.setItem('articles', JSON.stringify(newData))

                setLoad(false)

                if (data.articles.length === 0) {
                    setNewsNotFound(true)
                }
            })
            .catch(() => {
                setLoad(false)
                setErrReq(true)
            })
    }

    // Показ еще трех карточек 
    function showMoreCards() {
        if (cards.length > numberOfCards) {
            setNumberOfCards(numberOfCards + NUMBER_OF_CARDS);
        }
    }

    return (
        <>
            <div className="page" >

                <CurrentUserContext.Provider value={currentUser} >

                    <Header
                        loggedIn={loggedIn}
                        handleRegister={handleRegister}
                        handleLogOut={handleLogOut}
                        handleMobileView={handleMobileView}
                        handleInfoClose={handleInfoClose}
                        mobileView={mobileView}
                        popupRegisterOpen={popupRegisterOpen}
                        onClose={closeAllPopups}
                        popupLoginOpen={popupLoginOpen}
                        articles={saveArticle}

                    />
                    <Switch>

                        <Route exact path='/'>
                            <Main
                                handleClick={handleSaveArtical}
                                loggedIn={loggedIn}
                                cards={cards}
                                search={search}
                                setSearch={setSearch}
                                handleSearchSubmit={handleSearchSubmit}
                                load={load}
                                errReq={errReq}
                                showMoreCards={showMoreCards}
                                numberOfCards={numberOfCards}
                                newsNotFound={newsNotFound}
                                articles={saveArticle}
                                handleDeleteClick={handleDeleteArticle}
                                setPopupLoginOpen={setPopupLoginOpen}
                            />
                        </Route>

                        <ProtectedRoute
                            path='/saved-news'
                            component={SavedNews}
                            handleDeleteClick={handleDeleteArticle}
                            articles={saveArticle}
                        />
                    </Switch>

                    <Footer />

                    <Register
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                        name={name}
                        setName={setName}
                        isOpen={popupRegisterOpen}
                        onClose={closeAllPopups}
                        handleLogin={handleLogin}
                        showRegisterOk={showRegisterOk}
                        register={register}
                        errors={errors}
                        handleSubmit={handleSubmit(handleSubmitRegister)}
                        successfulReg={successfulReg}
                        isSubmitting={isSubmitting}

                    />

                    <Login
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                        isOpen={popupLoginOpen}
                        handleLogin={handleLogin}
                        handleRegister={handleRegister}
                        onClose={closeAllPopups}
                        register={regLogin}
                        errors={errLogin}
                        handleSubmit={submitLogin(handleSubmitLogin)}
                        successfulReg={successfulReg}
                        isSubmitting={isSubmitting}
                    />

                    <InfoTooltip
                        registerText="Пользователь успешно зарегистрирован!"
                        isOpen={registerOk}
                        onClose={closeAllPopups}
                        handleLogin={handleLogin}>
                    </InfoTooltip>

                </ CurrentUserContext.Provider >

            </div>
        </>
    )
}

export default withRouter(App);
