const router = require('express').Router();
const auth = require('../middlewares/auth');
const NotFoundError = require('../utils/NotFoundError');
const { RESOURCE_NOT_FOUND } = require('../utils/errorMessages');

const userRouter = require('./users');

const articleRouter = require('./articles');

router.use(userRouter, articleRouter);

router.use('*', auth, (req, res, next) => {
  next(new NotFoundError(RESOURCE_NOT_FOUND));
});

module.exports = router;
