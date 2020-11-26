import React from 'react';
import approveSign from '../images/union.svg';
import redCross from '../images/redcross.svg';

function InfoTooltip(props) {
    return(
        <section className={`popup popup_type_infotooltip ${props.isOpen ? 'popup_opened' : ''}`} onClick={props.onCloseByOverlay}>
            <div className='popup__container popup__container_type_infotooltip'>
                <button className='popup__close-button button' type="button" onClick={props.onClose}></button>
                <div className="popup__image" style={{backgroundImage: `url(${props.loggedIn ? approveSign : redCross})`}} />
                <h2 className="popup__title popup__title_type_infotooltip">{props.loggedIn ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</h2>
            </div>
        </section>
    )
}

export default InfoTooltip;