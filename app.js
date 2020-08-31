const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');

const { celebrate, Joi, errors } = require('celebrate');

const articlesRoute = require('./routes/articles');
const usersRoute = require('./routes/users');

const auth = require('./middlewares/auth');
const { login, createUser } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/limiter');

const BadRequestError = require('./errors/BadRequestError');
const NotFoundError = require('./errors/NotFoundError');

const validatePass = require('./regex/PasReg');

const app = express();
const { PORT, SERVER_CONNECT } = require('./config');

app.use(cors());

mongoose.connect(SERVER_CONNECT, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(helmet());
app.use(limiter);
app.use(requestLogger);

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string()
        .required()
        .email()
        .error(() => new BadRequestError('Введите почту в верном формате')),
      password: Joi.string()
        .required()
        .pattern(validatePass)
        .error(() => new BadRequestError('Введите верный пароль, без этого никак')),
    }),
  }),
  login,
);

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string()
        .required()
        .email()
        .error(() => new BadRequestError('Введите почту в верном формате')),
      password: Joi.string()
        .required()
        .pattern(validatePass)
        .error(() => new BadRequestError('Необходимо задать пароль, содержащий строчные латинские буквы и цифры длинной не менее 8 символов')),
      name: Joi.string()
        .required()
        .min(2)
        .max(30)
        .error(() => new BadRequestError('Имя обязательно')),
    }),
  }),
  createUser,
);

app.use('/articles', auth, articlesRoute);
app.use('/users', auth, usersRoute);

app.use('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });
  next();
});

app.listen(PORT);
