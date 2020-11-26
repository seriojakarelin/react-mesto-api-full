const Card = require('../models/card');

const NOT_FOUND = 404;
const BAD_REQUEST = 400;
const SERVER_ERROR = 500;

module.exports.getCards = ((req, res) => {
  Card.find({})
    .then((data) => {
      res.status(200).send(data);
    })
    .catch(() => {
      res.status(SERVER_ERROR).send({ message: 'Ошибка на сервере' });
    });
});

module.exports.createCard = ((req, res) => {
  const { _id } = req.user;
  const { name, link } = req.body;
  Card.create({ name, link, owner: _id })
    .then((card) => {
      res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: 'Ошибка валидации карточки' });
      } else {
        res.status(SERVER_ERROR).send({ message: 'Ошибка на сервере' });
      }
    });
});

module.exports.deleteCard = ((req, res) => {
  Card.findByIdAndDelete({ _id: req.params.id })
    .orFail(() => new Error('NotFound', 'Нет карточки с таким id'))
    .then((card) => {
      if (req.params.id !== card.owner) {
        return Promise.reject(new Error('Нет прав для удаления карточки'));
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Ошибка валидации карточки' });
      } else if (err.message === 'NotFound') {
        res.status(NOT_FOUND).send({ message: 'Нет карточки с таким id' });
      } else {
        res.status(SERVER_ERROR).send({ message: 'Ошибка на сервере' });
      }
    });
});
