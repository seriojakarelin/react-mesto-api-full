const usersRouter = require('express').Router();
const {
  getUsers,
  getUser,
  createUser,
  getCurrentUser,
  login,
} = require('../controllers/user');
const { auth } = require('../middlewares/auth');

usersRouter.get('/users', auth, getUsers);

usersRouter.get('/users/me', auth, getCurrentUser);

usersRouter.get('/users/:id', auth, getUser);

usersRouter.post('/signin', login);

usersRouter.post('/signup', createUser);

module.exports = usersRouter;
