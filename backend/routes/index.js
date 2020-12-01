const router = require('express').Router();

const usersRouter = require('./users');
const cardsRouter = require('./cards');
const notFoundRouter = require('./notFound');
const crashTestRouter = require('./crashTest');

router.use(
  usersRouter,
  cardsRouter,
  notFoundRouter,
  crashTestRouter,
);

module.exports = router;
