const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getMe } = require('../controllers/users');

usersRouter.get('/me', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex(),
  }),
}), getMe);

module.exports = usersRouter;
