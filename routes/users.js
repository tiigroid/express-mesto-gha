const routerUsers = require('express').Router();
const {
  getAllUsers, getUserById, addUser, editUserInfo,
} = require('../controllers/users');

routerUsers.get('/', getAllUsers);
routerUsers.get('/:userId', getUserById);
routerUsers.post('/', addUser);
routerUsers.patch('/me', editUserInfo);
routerUsers.patch('/me/avatar', editUserInfo);

module.exports = routerUsers;
