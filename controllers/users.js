const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const AuthError = require('../errors/AuthError');
const NotFoundError = require('../errors/NotFoundError');
const UniqueUserError = require('../errors/UniqueUserError');
const BadRequestError = require('../errors/BadRequestError');

module.exports.getMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      } else {
        res.send({ name: user.name, email: user.email });
      }
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      User.create({
        email, password: hash, name,
      })
        .then((user) => res.send({
          name: user.name, email: user.email,
        }))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            if (err.errors.email && err.errors.email.kind === 'unique') {
              throw new UniqueUserError('Пользователь с таким E-mail уже существует');
            } else {
              throw new BadRequestError('Ошибка валидации');
            }
          }
        })
        .catch(next);
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return next(new AuthError('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return next(new AuthError('Неправильные почта или пароль'));
          }
          const token = jwt.sign({ _id: user._id }, process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
          return res.status(200).send({ token })
            .end();
        })
        .catch(next);
    });
};
