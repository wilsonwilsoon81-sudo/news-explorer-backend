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

module.exports = { validateUserBody, validateLoginBody };
