const jwt = require('jsonwebtoken');
const InvalidReg = require('../utils/InvalidReg');
const { NODE_ENV, JWT_SECRET } = require('../config');
const { AUTHORIZATION_NEEDED } = require('../utils/errorMessages');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new InvalidReg(AUTHORIZATION_NEEDED);
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    next(new InvalidReg(AUTHORIZATION_NEEDED));
  }

  req.user = payload;
  return next();
};
