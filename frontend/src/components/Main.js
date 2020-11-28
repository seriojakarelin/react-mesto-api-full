import React from 'react';
import Card from './Card.js';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js'

function Main(props) {

    const currentUserInfo = React.useContext(CurrentUserContext);

    return(
        <main className="content">

            <section className="profile">
                <div className="profile__avatar" style={{ backgroundImage: `url(${currentUserInfo.avatar})` }}></div>
                <div className="profile__info">
                    <h1 className="profile__name">{currentUserInfo.name}</h1>
                    <p className="profile__job">{currentUserInfo.about}</p>
                </div>
                <button className="button profile__add-button" type="button" onClick={props.onAddPlace}></button>
            </section>

            <ul className="gallery">
                
                {props.cards.map((card) =>
                    <Card 
                        key={card._id} 
                        card={card} 
                        onCardClick={props.onCardClick} 
                        onCardDelete={props.onCardDelete} />
                )}

            </ul>

        </main>    
    )
}

export default Main;