const routerCards = require('express').Router();
const { validateCardId, validateCardData } = require('../middlewares/handle-validation');
const {
  getAllCards, createCard, deleteCardById, likeCard, dislikeCard,
} = require('../controllers/cards');

routerCards.get('/', getAllCards);
routerCards.post('/', validateCardData(), createCard);
routerCards.delete('/:cardId', validateCardId(), deleteCardById);
routerCards.put('/:cardId/likes', validateCardId(), likeCard);
routerCards.delete('/:cardId/likes', validateCardId(), dislikeCard);

module.exports = routerCards;
