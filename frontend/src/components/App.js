import React from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithImage from './PopupWithImage.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
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

const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
const [selectedCard, setCardSelected] = React.useState(null);
const [currentUser, setCurrentUser] = React.useState('');
const [cards, setCards] = React.useState([]);
const [loggedIn, setIsLoggedIn] = React.useState(false);
const [userData, setUserData] = React.useState({});
const history = useHistory();

React.useEffect(() => {
  api.getCards()
  .then(initialCards => {
      setCards(initialCards);
  })
  .catch((err) => {
      console.log(err);
  })
}, []);

React.useEffect(() => {
  api.getUser()
  .then(res => {
      setCurrentUser(res);
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
          setUserData(res.data)
          handleLoggedIn();
          history.push('/');
        }
      })
    }
}, [history]);

function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    if(!isLiked) {
        api.addLike(card)
        .then((newCard) => {
          const newCards = cards.map((c) => c._id === card._id ? newCard : c);
          setCards(newCards);
        })
        .catch((err) => {
            console.log(err);
        })
    } else {
        api.deleteLike(card._id)
        .then((newCard) => {
          const newCards = cards.map((c) => c._id === card._id ? newCard : c);
          setCards(newCards);
        })
        .catch((err) => {
            console.log(err);
        })
    }
}

function handleCardDelete(card) {

    const isDeletable = card.owner._id === currentUser._id;

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

function handleEditAvatarClick() {
  setIsEditAvatarPopupOpen(true);
}


function handleEditProfileClick() {
  setIsEditProfilePopupOpen(true);
}


function handleAddPlaceClick() {
  setIsAddPlacePopupOpen(true);
}

function handleInfoTooltipOpen() {
  setIsInfoTooltipOpen(true);
}

function closeAllPopups() {
  setIsEditProfilePopupOpen(false);
  setIsAddPlacePopupOpen(false);
  setIsEditAvatarPopupOpen(false);
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

function handleUpdateUser(newUser) {
  api.changeUser(newUser)
  .then(res => {
      setCurrentUser(res);
      closeAllPopups();
  })
  .catch((err) => {
      console.log(err);
  })
}

function handleUpdateAvatar(newAvatar) {
  api.changeAvatar(newAvatar)
  .then(res => {
      setCurrentUser(res);
      closeAllPopups();
  })
  .catch((err) => {
      console.log(err);
  })
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

function handleLoggedIn() {
  setIsLoggedIn(true);
}

function handleLoggedOut() {
  setIsLoggedIn(false);
}

  return (
    <div className="page">

      <CurrentUserContext.Provider value={currentUser}>

          <Header 
          userData = {userData}
          handleLoggedOut = {handleLoggedOut}
          />

          <Switch>

            <Route exact path="/">
              <ProtectedRoute path="/" loggedIn={loggedIn} component={Main} 
              onEditAvatar = {handleEditAvatarClick}
              onEditProfile = {handleEditProfileClick}
              onAddPlace = {handleAddPlaceClick}
              onCardClick = {handleCardClick}
              cards = {cards}
              onCardLike = {handleCardLike}
              onCardDelete = {handleCardDelete}
              />

              <Footer />
            </Route>

            <Route path="/sign-in">
              <Login 
              handleLoggedIn = {handleLoggedIn}
              handleInfoTooltipOpen = {handleInfoTooltipOpen}
              />
            </Route>

            <Route path="/sign-up">
              <Register />
            </Route>

          </Switch>

          <EditProfilePopup
            isOpen = {isEditProfilePopupOpen}
            onClose = {closeAllPopups}
            onCloseByOverlay = {closingPopupsByOverlay}
            onUpdateUser = {handleUpdateUser}>
          </EditProfilePopup>

          <AddPlacePopup
            isOpen = {isAddPlacePopupOpen}
            onClose = {closeAllPopups}
            onCloseByOverlay = {closingPopupsByOverlay}
            onAddPlace = {handleAddPlace}>
          </AddPlacePopup>

          <EditAvatarPopup
            isOpen = {isEditAvatarPopupOpen}
            onClose = {closeAllPopups}
            onCloseByOverlay = {closingPopupsByOverlay}
            onUpdateAvatar = {handleUpdateAvatar}>
          </EditAvatarPopup>

          <PopupWithImage 
            card = {selectedCard}
            onClose = {closeAllPopups}
            onCloseByOverlay = {closingPopupsByOverlay}>
          </PopupWithImage>

          <InfoTooltip
            loggedIn={loggedIn}
            isOpen = {isInfoTooltipOpen}
            onClose = {closeAllPopups}
            onCloseByOverlay = {closingPopupsByOverlay}>
          </InfoTooltip>

      </CurrentUserContext.Provider>

    </div>
  );
}

export default App;
