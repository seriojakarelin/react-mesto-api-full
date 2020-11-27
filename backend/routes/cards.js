const cardsRouter = require('express').Router();
const { getCards, createCard, deleteCard } = require('../controllers/cards');
const { auth } = require('../middlewares/auth');

cardsRouter.get('/cards', auth, getCards);

cardsRouter.post('/cards', auth, createCard);

cardsRouter.delete('/cards/:id', auth, deleteCard);

module.exports = cardsRouter;
