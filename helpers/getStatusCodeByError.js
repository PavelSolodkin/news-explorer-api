const BadRequestError = require('../errors/BadRequestError');

module.exports = (err, next) => {
  if (err.name === 'ValidationError') {
    next(new BadRequestError('Что-то пошло не так...'));
  } else {
    next(err);
  }
};
