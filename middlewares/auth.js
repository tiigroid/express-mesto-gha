const jwt = require('jsonwebtoken');
const { authorizationError } = require('../utils/errors');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    next(authorizationError('Необходима авторизация'));
  } else {
    let payload;
    try {
      payload = jwt.verify(token, '6010553b2d9477d710920b4605b28a67');
    } catch (err) {
      next(authorizationError('Ошибка авторизации'));
    }
    req.user = payload;
    next();
  }
};
