const User = require('../models/user');
const { sendBadRequest, sendUserNotFound, sendServerError } = require('../utils/errors');

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => sendServerError(res));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => (user ? res.send(user) : sendUserNotFound(res)))
    .catch(() => sendServerError(res));
};

module.exports.addUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => (err.name === 'ValidationError' ? sendBadRequest(res) : sendServerError(res)));
};

module.exports.editUserInfo = (req, res) => {
  const { name, about, avatar } = req.body;
  User.findOneAndUpdate(
    { _id: req.user._id },
    { name, about, avatar },
    { new: true, runValidators: true },
  )
    .then((user) => (user ? res.send(user) : sendUserNotFound(res)))
    .catch((err) => (err.name === 'ValidationError' ? sendBadRequest(res) : sendServerError(res)));
};
