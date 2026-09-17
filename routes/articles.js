const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');
const { getArticles, createArticle, deleteArticle } = require('../controllers/articles');

const validateArticleBody = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string()
      .required()
      .messages({
        'any.required': 'La palabra clave es obligatoria',
      }),
    title: Joi.string()
      .required()
      .messages({
        'any.required': 'El título es obligatorio',
      }),
    text: Joi.string()
      .required()
      .messages({
        'any.required': 'El texto es obligatorio',
      }),
    date: Joi.string()
      .required()
      .messages({
        'any.required': 'La fecha es obligatoria',
      }),
    source: Joi.string()
      .required()
      .messages({
        'any.required': 'La fuente es obligatoria',
      }),
    link: Joi.string()
      .uri()
      .required()
      .messages({
        'string.uri': 'El enlace debe ser una URL válida',
        'any.required': 'El enlace es obligatorio',
      }),
    image: Joi.string()
      .uri()
      .required()
      .messages({
        'string.uri': 'La imagen debe ser una URL válida',
        'any.required': 'La imagen es obligatoria',
      }),
  }),
});

const validateArticleId = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string()
      .hex()
      .length(24)
      .required()
      .messages({
        'string.hex': 'ID de artículo inválido',
        'any.required': 'El ID del artículo es obligatorio',
      }),
  }),
});

router.get('/', auth, getArticles);
router.post('/', auth, validateArticleBody, createArticle);
router.delete('/:articleId', auth, validateArticleId, deleteArticle);

module.exports = router;
