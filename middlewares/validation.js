const { Joi, celebrate } = require('celebrate');

const validateUserBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .min(2)
      .max(30)
      .required()
      .messages({
        'string.min': 'El nombre debe tener al menos 2 caracteres',
        'string.max': 'El nombre no puede exceder los 30 caracteres',
        'any.required': 'El nombre es obligatorio',
      }),
    email: Joi.string()
      .email()
      .required()
      .messages({
        'string.email': 'El email debe ser válido',
        'any.required': 'El email es obligatorio',
      }),
    password: Joi.string()
      .required()
      .messages({
        'any.required': 'La contraseña es obligatoria',
      }),
  }),
});

const validateLoginBody = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .email()
      .required()
      .messages({
        'string.email': 'El email debe ser válido',
        'any.required': 'El email es obligatorio',
      }),
    password: Joi.string()
      .required()
      .messages({
        'any.required': 'La contraseña es obligatoria',
      }),
  }),
});

const validateArticleBody = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().messages({
      'any.required': 'La palabra clave es obligatoria',
    }),
    title: Joi.string().required().messages({
      'any.required': 'El título es obligatorio',
    }),
    text: Joi.string().required().messages({
      'any.required': 'El texto es obligatorio',
    }),
    date: Joi.string().required().messages({
      'any.required': 'La fecha es obligatoria',
    }),
    source: Joi.string().required().messages({
      'any.required': 'La fuente es obligatoria',
    }),
    link: Joi.string().uri().required().messages({
      'string.uri': 'El enlace debe ser una URL válida',
      'any.required': 'El enlace es obligatorio',
    }),
    image: Joi.string().uri().required().messages({
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

module.exports = {
  validateUserBody,
  validateLoginBody,
  validateArticleBody,
  validateArticleId,
};
