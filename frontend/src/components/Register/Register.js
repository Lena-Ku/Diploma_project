import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm.js';
import validator from 'validator';


function Register({ name, setName, isOpen, email, setEmail, password, setPassword, handleLogin, onClose, register, 
    errors, handleSubmit, successfulReg, isSubmitting }) {

    function handlePasswordChange(e) {
        setPassword(e.target.value)
    }

    function handleEmailChange(e) {
        setEmail(e.target.value)
    }

    function handleNameChange(e) {
        setName(e.target.value)
    }

    const invalidPassword =  errors.password?.type === "required" || password === '';
    const invalidName = errors.name?.type === "required" || name === '';
    const inValidEmail = errors.email?.type === "required" || errors.email?.type === "isEmail" || email === '';
    const isInvalid = invalidPassword || invalidName || inValidEmail || isSubmitting;

    const RegOpen = isOpen;

    return (
        <PopupWithForm
            name="register"
            title="Регистрация"
            submitButtonText="Зарегистрироваться"
            isOpen={isOpen}
            handleLogin={handleLogin}
            handleSubmit={handleSubmit}
            RegOpen={RegOpen}
            onClose={onClose}
            popupWithoutButton={false}
            isInvalid={isInvalid}
            isSubmitting={isSubmitting}
            
            text="Войти"
            children={
                <>
                    <div className="popup__field">
                        <p className="popup__label">Email</p>
                        <input className="popup__item" type="email" name="email" 
                            placeholder="Введите адрес электронной почты" value={email} onChange={handleEmailChange}
                            disabled={isSubmitting} ref={register({
                                required: true,
                                validate: {
                                    isEmail: (value) =>
                                        validator.isEmail(value),
                                },
                            })
                            }
                        />
                        <span className="popup__item-error">
                            {errors.email?.type === "required" && 'Это поле обязательно для заполнения'}
                            {errors.email?.type === "isEmail" && 'Неправильный формат email'}
                        </span>
                    </div>
                    <div className="popup__field">
                        <p className="popup__label">Пароль</p>
                        <input className="popup__item" type="password" name="password" placeholder="Введите пароль" value={password} onChange={handlePasswordChange}
                            disabled={isSubmitting} ref={register({
                                required: true,
                            })}
                        />
                         <span className="popup__item-error">
                            {errors.password?.type === "required" && 'Это поле обязательно для заполнения'}
                        </span>
                    </div>
                    <div className="popup__field">
                        <p className="popup__label">Имя</p>
                        <input className="popup__item" type="text" name="name" placeholder="Имя" value={name} onChange={handleNameChange}
                            disabled={isSubmitting} ref={register({
                                required: true,
                            })}
                        />
                        <span className="popup__item-error">
                            {errors.password?.type === "required" && 'Это поле обязательно для заполнения'}
                        </span>
                    </div>
                    {
                        !successfulReg && <p className="popup__text popup__text_error">Такой пользователь уже есть</p>
                    }

                </>
            } />
    )
}

export default Register;

/*
{
          successfulReg &&
          <>
          <p className="popup__heading">Пользователь успешно зарегистрирован!</p>
          <button className="popup__text popup__text_enter" onClick={handleLogin}>Войти</button>
          </>
        }
*/

// {errors.email?.type === "required" && 'Это поле обязательно для заполнения'}