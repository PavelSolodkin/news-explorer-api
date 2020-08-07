const Article = require('../models/article');
const getStatusCodeByError = require('../helpers/getStatusCodeByError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

module.exports.createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  Article.create({
    keyword, title, text, date, source, link, image, owner: req.user._id,
  })
    .then((article) => res.send({
      keyword: article.keyword,
      title: article.title,
      text: article.text,
      date: article.date,
      source: article.source,
      link: article.link,
      image: article.image,
    }))
    .catch((err) => getStatusCodeByError(err, next));
};

module.exports.getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => res.send({ articles }))
    .catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId)
    .then((article) => {
      if (!article) {
        throw new NotFoundError('Статья не найдена');
      } else if (JSON.stringify(article.owner) !== JSON.stringify(req.user._id)) {
        throw new ForbiddenError('Невозможно удалить чужую статью');
      } else {
        Article.findByIdAndDelete(article._id)
          .then((deleteArticle) => res.send({ deleteArticle, message: 'Выбранная статья удалена' }))
          .catch(next);
      }
    })
    .catch(next);
};
