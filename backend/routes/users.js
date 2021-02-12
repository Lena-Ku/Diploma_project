const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getUser, createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');

router.get('/users/me', auth, getUser);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().pattern(/^\s/, { invert: true }),
    name: Joi.string().min(2).max(30).required(),
  }),
}), createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

module.exports = router;
