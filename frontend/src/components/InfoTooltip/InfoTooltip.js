import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm.js';


function InfoTooltip({ isOpen, onClose, successfulReg, handleLogin }) {

    return (
        <PopupWithForm
            name="registerInfo"
            isOpen={isOpen}
            title="Пользователь успешно зарегистрирован!"
            onClose={onClose}
            successfulReg={successfulReg}
            popupWithoutButton={true}
            RegOpen={true}
            handleLogin={handleLogin}
            text="Войти"
             >
        </PopupWithForm>

    )
}

export default InfoTooltip;