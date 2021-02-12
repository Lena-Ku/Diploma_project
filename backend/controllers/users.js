const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
const InvalidRequest = require('../utils/InvalidRequest');
const NotFoundError = require('../utils/NotFoundError');
const InvalidGeg = require('../utils/InvalidReg');
const Conflict = require('../utils/Conflict');
const {
  USER_ID_DO_NOT_EXIST,
  INVALID_DATA,
  USER_ALREADY_EXIST,
  EMAIL_OR_PASSWORD_INCORRECT,
} = require('../utils/errorMessages');

const { NODE_ENV, JWT_SECRET } = process.env;

const getUser = (req, res, next) => {
  userModel.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(USER_ID_DO_NOT_EXIST);
      }
      return res.send({
        email: user.email,
        name: user.name,
      });
    })

    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;
  if (!password || !email || !name) {
    throw new InvalidRequest(INVALID_DATA);
  }
  userModel.findOne({ email })
    .then((user) => {
      if (user) {
        throw new Conflict(USER_ALREADY_EXIST);
      }
      return bcrypt.hash(req.body.password, 10)
        .then((hash) => {
          userModel.create({
            email,
            password: hash,
            name,
          })
            .then((newUser) => {
              res.send({
                email: newUser.email,
                name: newUser.name});
            })
            .catch(next);
        })
        .catch(next);
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  if (!password || !email) {
    throw new InvalidGeg(EMAIL_OR_PASSWORD_INCORRECT);
  }
  return userModel.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      return res.send({ token });
    })

    .catch(next);
};

module.exports = {
  getUser,
  createUser,
  login,
};
