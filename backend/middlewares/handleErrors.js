const { SERVER_ERROR, INVALID_DATA } = require('../utils/errorMessages');

// eslint-disable-next-line no-unused-vars
module.exports = ((err, req, res, next) => {
  const { statusCode, message } = err;

  if (err.name === 'ValidationError') {
    return res.status(400).send({
      message: INVALID_DATA,
    });
  }

  return res.status(statusCode).send({
    message: statusCode === 500
      ? SERVER_ERROR
      : message,
  });
});
