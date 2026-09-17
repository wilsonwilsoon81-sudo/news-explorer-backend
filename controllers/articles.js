const Article = require('../models/article');

const getArticles = (req, res, next) => {
  const ownerId = req.user._id;

  Article.find({ owner: ownerId })
    .then((articles) => {
      res.status(200).send(articles);
    })
    .catch(next);
};

const createArticle = (req, res, next) => {
  const ownerId = req.user._id;
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;

  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: ownerId,
  })
    .then((article) => {
      res.status(201).send(article);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next({ status: 400, message: 'Datos inválidos al crear el artículo' });
      } else {
        next(err);
      }
    });
};

const deleteArticle = (req, res, next) => {
  const { articleId } = req.params;
  const ownerId = req.user._id;

  Article.findById(articleId).select('+owner')
    .then((article) => {
      if (!article) {
        return next({ status: 404, message: 'Artículo no encontrado' });
      }

      if (article.owner.toString() !== ownerId) {
        return next({ status: 403, message: 'No tienes permiso para eliminar este artículo' });
      }

      return Article.deleteOne({ _id: articleId })
        .then(() => {
          res.status(200).send({ message: 'Artículo eliminado correctamente' });
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next({ status: 400, message: 'ID de artículo inválido' });
      } else {
        next(err);
      }
    });
};

module.exports = { getArticles, createArticle, deleteArticle };
