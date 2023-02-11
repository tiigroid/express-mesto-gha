const { celebrate, Joi } = require('celebrate');

module.exports.validateSignIn = () => celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

module.exports.validateSignUp = () => celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).default('Жак-Ив Кусто'),
    about: Joi.string().min(2).max(30).default('Исследователь океана'),
    avatar:
      Joi.string()
        .pattern(/^https?:\/\/(www\.)?[a-z0-9@:%._+~#=-]+\.[a-z]+\/?(?:[a-z0-9-._~:/?#[\]@!$&'()*+,;=-]*)$/i)
        .default('https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png'),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

module.exports.validateUserId = () => celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
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
        .pattern(/^https?:\/\/(www\.)?[a-z0-9@:%._+~#=-]+\.[a-z]+\/?(?:[a-z0-9-._~:/?#[\]@!$&'()*+,;=-]*)$/i),
  }),
});

module.exports.validateCardId = () => celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
});

module.exports.validateCardData = () => celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link:
      Joi.string()
        .required()
        .pattern(/^https?:\/\/(www\.)?[a-z0-9@:%._+~#=-]+\.[a-z]+\/?(?:[a-z0-9-._~:/?#[\]@!$&'()*+,;=-]*)$/i),
  }),
});
