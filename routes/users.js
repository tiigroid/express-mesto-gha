const routerUsers = require('express').Router();
const {
  getAllUsers, getUserById, addUser, editUserInfo, editUserAvatar,
} = require('../controllers/users');

routerUsers.get('/', getAllUsers);
routerUsers.get('/:userId', getUserById);
routerUsers.post('/', addUser);
routerUsers.patch('/me', editUserInfo);
routerUsers.patch('/me/avatar', editUserAvatar);

module.exports = routerUsers;
