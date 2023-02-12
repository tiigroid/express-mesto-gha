const { celebrate, Joi } = require('celebrate');
const { urlPattern } = require('../utils/constants');

module.exports.validateSignIn = () => celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

module.exports.validateSignUp = () => celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar:
      Joi.string()
        .pattern(urlPattern),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.validateUserId = () => celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
});

module.exports.validateUserInfo = () => celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

module.exports.validateUserAvatar = () => celebrate({
  body: Joi.object().keys({
    avatar:
      Joi.string()
        .pattern(urlPattern),
  }),
});

module.exports.validateCardId = () => celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
});

module.exports.validateCardData = () => celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link:
      Joi.string()
        .required()
        .pattern(urlPattern),
  }),
});
