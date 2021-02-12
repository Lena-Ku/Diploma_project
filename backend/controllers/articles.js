const articleModel = require('../models/article');
const InvalidRequest = require('../utils/InvalidRequest');
const NotFoundError = require('../utils/NotFoundError');
const {
  INVALID_DATA,
  ARTICLE_DO_NOT_EXIST,
  ANOTHER_USER_ARTICLE,
} = require('../utils/errorMessages');

const getArticles = (req, res, next) => {
  const owner = req.user._id;
  articleModel.find({ owner })
    .then((cards) => {
      res.send(cards);
    })
    .catch(next);
};

const createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  const owner = req.user._id;

  if (!keyword || !title || !text || !date || !source || !link || !image) {
    throw new InvalidRequest(INVALID_DATA);
  }
  articleModel.create({
    keyword, title, text, date, source, link, image, owner,
  })
    .then((article) => {
      res.send(article);
    })
    .catch(next);
};

const deleteArticle = (req, res, next) => {
  articleModel.findById(req.params.articleId)
    .select('+owner')
    .then((article) => {
      if (!article) {
        throw new NotFoundError(ARTICLE_DO_NOT_EXIST);
      }
      if (req.user._id !== article.owner.toString()) {
        throw new InvalidRequest(ANOTHER_USER_ARTICLE);
      }
      articleModel.findByIdAndRemove(req.params.articleId)
        .then((deletedArticle) => {
          res.send(deletedArticle);
        });
    })
    .catch(next);
};

module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
};
