module.exports.authorizationError = (message) => {
  const err = new Error(message);
  err.statusCode = 401;
  return err;
};

module.exports.forbiddenError = (message) => {
  const err = new Error(message);
  err.statusCode = 403;
  return err;
};

module.exports.notFoundError = (message) => {
  const err = new Error(message);
  err.statusCode = 404;
  return err;
};
