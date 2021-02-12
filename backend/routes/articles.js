const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getArticles, createArticle, deleteArticle } = require('../controllers/articles');
const auth = require('../middlewares/auth');

router.get('/articles', auth, getArticles);

router.post('/articles', auth, celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().regex(/^(http|https):\/\/(www.)?(\w{1,}-?)+\.(\w{1,}-?)+(\/|#)?/),
    image: Joi.string().required().regex(/^(http|https):\/\/(www.)?(\w{1,}-?)+\.(\w{1,}-?)+(\/|#)?/),
  }),
}), createArticle);

router.delete('/articles/:articleId', auth, celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().required().length(24).hex(),
  }),
}), deleteArticle);

module.exports = router;
