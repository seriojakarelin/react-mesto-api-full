const usersRouter = require('express').Router();
const { celebrate } = require('celebrate');
const {
  getUsers,
  getUser,
  createUser,
  getCurrentUser,
  login,
} = require('../controllers/user');
const { auth } = require('../middlewares/auth');
const { signUpValidation } = require('../middlewares/validation/signup-validation');
const { signInValidation } = require('../middlewares/validation/signin-validation');

usersRouter.get('/users', auth, getUsers);

usersRouter.get('/users/me', auth, getCurrentUser);

usersRouter.get('/users/:id', auth, getUser);

usersRouter.post('/signin', celebrate(signInValidation), login);

usersRouter.post('/signup', celebrate(signUpValidation), createUser);

module.exports = usersRouter;
