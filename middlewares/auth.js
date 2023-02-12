const jwt = require('jsonwebtoken');
const AuthorizationError = require('../utils/errors/AuthorizationError');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    next(new AuthorizationError('Необходима авторизация'));
  } else {
    let payload;
    try {
      payload = jwt.verify(token, '6010553b2d9477d710920b4605b28a67');
    } catch (err) {
      next(new AuthorizationError('Ошибка авторизации'));
    }
    req.user = payload;
    next();
  }
};
