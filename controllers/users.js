const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { authorizationError, notFoundError } = require('../utils/errors');

module.exports.getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => (users.length > 0 ? res.send(users) : Promise.reject(notFoundError('Список пользователей пуст'))))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => (user ? res.send(user) : Promise.reject(notFoundError('Пользователь не найден'))))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.send(user))
    .catch((err) => (err.code === 11000 ? next({ statusCode: 409, message: 'Пользователь с таким email уже существует' }) : next(err)));
};

module.exports.getUserInfo = (req, res, next) => {
  User.findOne({ _id: req.user._id })
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.editUserInfo = (req, res, next) => {
  const { name, about } = req.body;

  User.findOneAndUpdate(
    { _id: req.user._id },
    { name, about },
    { new: true },
  )
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.editUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findOneAndUpdate(
    { _id: req.user._id },
    { avatar },
    { new: true },
  )
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  function handleAuthorizationError() {
    return next(authorizationError('Неправильные почта или пароль'));
  }

  function createToken(user) {
    const token = jwt.sign({ _id: user._id }, '6010553b2d9477d710920b4605b28a67', { expiresIn: '7d' });
    res.cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true }).end();
  }

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        handleAuthorizationError();
      } else {
        bcrypt.compare(password, user.password)
          .then((matched) => (matched ? createToken(user) : handleAuthorizationError()))
          .catch(next);
      }
    });
};
