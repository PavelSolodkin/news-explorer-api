const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../config');
const AuthError = require('../errors/AuthError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw next(new AuthError('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET_KEY);
  } catch (err) {
    throw next(new AuthError('Необходима авторизация'));
  }

  req.user = payload;

  next();
};
