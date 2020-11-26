const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const NOT_FOUND = 404;
const BAD_REQUEST = 400;
const SERVER_ERROR = 500;

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((data) => {
      res.status(200).send(data);
    })
    .catch(() => {
      res.status(SERVER_ERROR).send({ message: 'Ошибка на сервере' });
    });
};

module.exports.getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch(() => {
      res.status(SERVER_ERROR).send({ message: 'Ошибка на сервере' });
    });
};

module.exports.getUser = (req, res) => {
  User.findById({ _id: req.params.id })
    .orFail(() => new Error('NotFound', 'Нет пользователя с таким id'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Ошибка валидации пользователя' });
      } else if (err.message === 'NotFound') {
        res.status(NOT_FOUND).send({ message: 'Нет пользователя с таким id' });
      } else {
        res.status(SERVER_ERROR).send({ message: 'Ошибка на сервере' });
      }
    });
};

module.exports.createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name: name,
      about: about,
      avatar: avatar,
      email: email,
      password: hash,
    }))
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: 'Ошибка валидации пользователя' });
      } else {
        res.status(SERVER_ERROR).send({ message: 'Ошибка на сервере' });
      }
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error('Неправильные почта или пароль'));
        }

        const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
        console.log('!!!!!!')
        console.log(token)
        return res.send({ token });
      });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};
