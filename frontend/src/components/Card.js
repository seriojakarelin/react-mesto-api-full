import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';

function Card(props) {

    const currentUserInfo = React.useContext(CurrentUserContext);

    function handleClick() {
        props.onCardClick(props.card);
    } 

    function handleDeleteClick() {
        props.onCardDelete(props.card);
    }

    const isOwn = props.card.owner === currentUserInfo._id;
    
    return(
        <li className="gallery__card">
            <button className="gallery__trash-button button" type="button" style={{ display: `${isOwn ? '' : 'none'}` }} onClick={handleDeleteClick} ></button>
            <img className="gallery__photo" src={props.card.link} alt={props.card.name} onClick={handleClick} />
            <div className="gallery__info-container">
                <h2 className="gallery__photo-title">{props.card.name}</h2>
            </div>
        </li>
    )
}

export default Card;