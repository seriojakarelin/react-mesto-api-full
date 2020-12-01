const { Joi } = require('celebrate');

module.exports.signUpValidation = {
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
    name: Joi.string()
      .min(2)
      .max(30),
    about: Joi.string()
      .min(2)
      .max(30),
    avatar: Joi.string(),
  }),
};
