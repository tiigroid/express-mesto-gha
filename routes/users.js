const routerUsers = require('express').Router();
const { validateUserId, validateUserInfo, validateUserAvatar } = require('../middlewares/handle-validation');
const {
  getAllUsers, getUserInfo, getUserById, editUserInfo, editUserAvatar,
} = require('../controllers/users');

routerUsers.get('/', getAllUsers);
routerUsers.get('/me', getUserInfo);
routerUsers.get('/:userId', validateUserId(), getUserById);
routerUsers.patch('/me', validateUserInfo(), editUserInfo);
routerUsers.patch('/me/avatar', validateUserAvatar(), editUserAvatar);

module.exports = routerUsers;
