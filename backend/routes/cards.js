const cardsRouter = require('express').Router();
const { celebrate } = require('celebrate');
const { getCards, createCard, deleteCard } = require('../controllers/cards');
const { cardCreateValidation } = require('../middlewares/validation/cardcreate-validation');
const { auth } = require('../middlewares/auth');

cardsRouter.get('/cards', auth, getCards);

cardsRouter.post('/cards', auth, celebrate(cardCreateValidation), createCard);

cardsRouter.delete('/cards/:id', auth, deleteCard);

module.exports = cardsRouter;
