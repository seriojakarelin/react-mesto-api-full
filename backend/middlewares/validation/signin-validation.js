const { Joi } = require('celebrate');

module.exports.signInValidation = {
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email()
      .min(2)
      .max(30),
    password: Joi.string()
      .required()
      .min(2)
      .max(30),
  }),
};
