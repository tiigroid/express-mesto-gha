const Card = require('../models/card');
const { sendBadRequest, sendCardNotFound, sendServerError } = require('../utils/errors');

module.exports.getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => sendServerError(res));
};

module.exports.addCard = (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => (err.name === 'ValidationError' ? sendBadRequest(res) : sendServerError(res)));
};

module.exports.deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => (card ? res.send(card) : sendCardNotFound(res)))
    .catch(() => sendServerError(res));
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => (card ? res.send(card) : sendCardNotFound(res)))
    .catch((err) => (err.name === 'CastError' ? sendBadRequest(res) : sendServerError(res)));
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => (card ? res.send(card) : sendCardNotFound(res)))
    .catch((err) => (err.name === 'CastError' ? sendBadRequest(res) : sendServerError(res)));
};
