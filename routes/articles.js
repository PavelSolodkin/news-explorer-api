const articlesRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getArticles, createArticle, deleteArticle } = require('../controllers/articles');
const BadRequestError = require('../errors/BadRequestError');
const validateUrl = require('../regex/UrlReg');

articlesRouter.get('/', getArticles);

articlesRouter.post('/', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string()
      .required()
      .pattern(validateUrl)
      .error(() => new BadRequestError('Неверный формат ссылки статьи')),
    image: Joi.string()
      .required()
      .pattern(validateUrl)
      .error(() => new BadRequestError('Неверный формат ссылки изображения статьи')),
  }),
}), createArticle);

articlesRouter.delete('/:articleId', celebrate({
  params: Joi.object().keys({
    articleId: Joi.string()
      .length(24)
      .hex()
      .error(() => new BadRequestError('Некорректный ID статьи')),
  }),
}), deleteArticle);

module.exports = articlesRouter;
