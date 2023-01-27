const routerCards = require('express').Router();
const {
  getAllCards, addCard, deleteCardById, likeCard, dislikeCard,
} = require('../controllers/cards');

routerCards.get('/', getAllCards);
routerCards.post('/', addCard);
routerCards.delete('/:cardId', deleteCardById);
routerCards.put('/:cardId/likes', likeCard);
routerCards.delete('/:cardId/likes', dislikeCard);

module.exports = routerCards;
