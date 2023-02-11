const Card = require('../models/card');
const { notFoundError, forbiddenError } = require('../utils/errors');

module.exports.getAllCards = (req, res, next) => {
  Card.find({})
    .then((cards) => (res.send(cards)))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch(next);
};

module.exports.deleteCardById = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw notFoundError('Карточка не найдена');
      }
      if (card.owner.toString() !== req.user._id) {
        throw forbiddenError('Ошибка доступа');
      }

      Card.findByIdAndRemove(req.params.cardId)
        .then((validCard) => (validCard && res.send(validCard)))
        .catch(next);
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => (card ? res.send(card) : Promise.reject(notFoundError('Карточка не найдена'))))
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => (card ? res.send(card) : Promise.reject(notFoundError('Карточка не найдена'))))
    .catch(next);
};
