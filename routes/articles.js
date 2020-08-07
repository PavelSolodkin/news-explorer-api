const articlesRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getArticles, createArticle, deleteArticle } = require('../controllers/articles');
const BadRequestError = require('../errors/BadRequestError');
const validateUrl = require('../regex/UrlReg');

articlesRouter.get('/', getArticles);

articlesRouter.post('/', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().error(() => new BadRequestError('Значение в каждом из полей должно быть не менее 2 символов')),
    title: Joi.string().required().error(() => new BadRequestError('Значение в каждом из полей должно быть не менее 2 символов')),
    text: Joi.string().required().error(() => new BadRequestError('Значение в каждом из полей должно быть не менее 2 символов')),
    date: Joi.string().required().error(() => new BadRequestError('Значение в каждом из полей должно быть не менее 2 символов')),
    source: Joi.string().required().error(() => new BadRequestError('Значение в каждом из полей должно быть не менее 2 символов')),
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
