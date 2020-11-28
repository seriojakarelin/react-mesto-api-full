import React from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithImage from './PopupWithImage.js';
import AddPlacePopup from './AddPlacePopup.js';
import ProtectedRoute from './ProtectedRoute.js';
import Register from './Register.js';
import Login from './Login.js';
import InfoTooltip from './InfoTooltip.js';
import * as Auth from './Auth.js';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';
import {api} from '../utils/Api.js';
import '../index.css';

function App() {

const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
const [selectedCard, setCardSelected] = React.useState(null);
const [cards, setCards] = React.useState([]);
const [loggedIn, setIsLoggedIn] = React.useState(false);
const [userData, setUserData] = React.useState({});
const [signedUp, setIsSignedUp] = React.useState(false);
const history = useHistory();

React.useEffect(() => {
  api.getCards()
  .then(initialCards => {
      setCards(initialCards.reverse());
  })
  .catch((err) => {
      console.log(err);
  })
}, []);

React.useEffect(() => {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt'); 
  
      Auth.getContent(jwt).then((res) => {
        if (res) {
          setUserData(res);
          handleLoggedIn();
          history.push('/');
        }
      })
    }
}, [history]);

function handleCardDelete(card) {

    const isDeletable = card.owner === userData._id;

    if (isDeletable) {
        api.deleteCard(card._id)
        .then((res) => {
          const newCards = cards.filter((c) => c._id !== card._id);
          setCards(newCards);
        })
        .catch((err) => {
            console.log(err);
        })
    }
}


function handleAddPlaceClick() {
  setIsAddPlacePopupOpen(true);
}

function handleInfoTooltipOpen() {
  setIsInfoTooltipOpen(true);
}

function closeAllPopups() {
  setIsAddPlacePopupOpen(false);
  setIsInfoTooltipOpen(false);

  setCardSelected();
}

function closingPopupsByOverlay(evt) {
  if (evt.target !== evt.currentTarget) {
    return;
  } 

  closeAllPopups();
}

function handleCardClick(card) {
  setCardSelected(card);
}

function handleAddPlace(newCard) {
  api.createCard(newCard)
  .then(res => {
      setCards([res, ...cards]);
      closeAllPopups();
  })
  .catch((err) => {
      console.log(err);
  })
}
function handleSignedUp() {
  setIsSignedUp(true);
}

function handleLoggedIn() {
  setIsLoggedIn(true);
}

function handleLoggedOut() {
  setIsLoggedIn(false);
}

  return (
    <div className="page">

      <CurrentUserContext.Provider value={userData}>

          <Header 
          userData = {userData}
          handleLoggedOut = {handleLoggedOut}
          />

          <Switch>

            <Route exact path="/">
              <ProtectedRoute path="/" loggedIn={loggedIn} component={Main} 
              onAddPlace = {handleAddPlaceClick}
              onCardClick = {handleCardClick}
              cards = {cards}
              onCardDelete = {handleCardDelete}
              />

              <Footer />
            </Route>

            <Route path="/sign-in">
              <Login 
              handleLoggedIn = {handleLoggedIn}
              handleInfoTooltipOpen = {handleInfoTooltipOpen}
              setIsSignedUp = {setIsSignedUp}
              setUserData = {setUserData}
              />
            </Route>

            <Route path="/sign-up">
              <Register 
              handleSignedUp = {handleSignedUp}
              handleInfoTooltipOpen = {handleInfoTooltipOpen}
              />
            </Route>

          </Switch>

          <AddPlacePopup
            isOpen = {isAddPlacePopupOpen}
            onClose = {closeAllPopups}
            onCloseByOverlay = {closingPopupsByOverlay}
            onAddPlace = {handleAddPlace}>
          </AddPlacePopup>

          <PopupWithImage 
            card = {selectedCard}
            onClose = {closeAllPopups}
            onCloseByOverlay = {closingPopupsByOverlay}>
          </PopupWithImage>

          <InfoTooltip
            isOpen = {isInfoTooltipOpen}
            onClose = {closeAllPopups}
            onCloseByOverlay = {closingPopupsByOverlay}
            signedUp = {signedUp}>
          </InfoTooltip>

      </CurrentUserContext.Provider>

    </div>
  );
}

export default App;
