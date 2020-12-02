const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-error');
const BadRequestError = require('../errors/bad-request-error');

module.exports.getCards = ((req, res, next) => {
  Card.find({})
    .then((data) => {
      res.status(200).send(data);
    })
    .catch(next);
});

module.exports.createCard = ((req, res, next) => {
  const { _id } = req.user;
  const { name, link } = req.body;
  Card.create({ name, link, owner: _id })
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Ошибка валидации');
      }
      throw err;
    })
    .catch(next);
});

module.exports.deleteCard = ((req, res, next) => {
  Card.findById({ _id: req.params.id })
    .orFail(new NotFoundError('Нет карточки с таким id'))
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        throw new ForbiddenError('Недостаточно прав для удаления карточки');
      }
      Card.deleteOne(card)
        .then(() => {
          res.status(200).send(card);
        });
    })
    .catch(next);
});
