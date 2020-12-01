const usersRouter = require('express').Router();
const { celebrate } = require('celebrate');
const {
  getUsers,
  getUser,
  createUser,
  getCurrentUser,
  login,
} = require('../controllers/users');
const { auth } = require('../middlewares/auth');
const { signUpValidation } = require('../middlewares/validation/signup-validation');
const { signInValidation } = require('../middlewares/validation/signin-validation');
const { userIdValidation } = require('../middlewares/validation/user-id-validation');

usersRouter.get('/users', auth, getUsers);

usersRouter.get('/users/me', auth, getCurrentUser);

usersRouter.get('/users/:id', celebrate(userIdValidation), auth, getUser);

usersRouter.post('/signin', celebrate(signInValidation), login);

usersRouter.post('/signup', celebrate(signUpValidation), createUser);

module.exports = usersRouter;
