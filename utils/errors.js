const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const SERVER_ERROR = 500;

module.exports.sendBadRequest = (res) => res.status(BAD_REQUEST).send({ message: 'Неверный формат данных' });
module.exports.sendUserNotFound = (res) => res.status(NOT_FOUND).send({ message: 'Пользователь не найден' });
module.exports.sendCardNotFound = (res) => res.status(NOT_FOUND).send({ message: 'Карточка не найдена' });
module.exports.sendServerError = (res) => res.status(SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
