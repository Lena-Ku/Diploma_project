import React from 'react';

function PopupWithForm({ name, isOpen, title, children, submitButtonText, onClose, isInvalid, text, handleLogin, RegOpen, 
  loginOpen, handleRegister, popupWithoutButton, handleSubmit }) {

    function handleOverlay(evt) {
      const element = evt.target;
      if (element.classList.contains('popup_opened')) {
        onClose();
      }
    }

  return (
    <section className={`popup popup_${name} ${isOpen ? "popup_opened" : " "}`} onClick={handleOverlay}>
      <form className="popup__container" name={name} noValidate={true} onSubmit={handleSubmit}>
        <button className="popup__close" type="button" onClick={onClose}></button>
        
        <h3 className={`popup__heading popup__heading_${popupWithoutButton && "info"}`}>{title}</h3>
        {children}
        {
          !popupWithoutButton && <button disabled={isInvalid} className="popup__button"
            type="submit">{submitButtonText}</button>
        }
        
        <div className={`popup__link popup__link_${popupWithoutButton && "info"}`}>
          {
            !popupWithoutButton && <p className="popup__text">Или&nbsp;</p>
          }
          {
            RegOpen &&  <button className={`popup__text popup__text_enter popup__text_${popupWithoutButton && "info"}`}
            onClick={handleLogin}>{text}</button>
          }
          {
            loginOpen &&  <button className="popup__text popup__text_enter" onClick={handleRegister}>{text}</button>
          }
        </div>
      </form>
    </section>

  )
}

export default PopupWithForm;