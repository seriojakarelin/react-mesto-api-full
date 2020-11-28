const { Joi } = require('celebrate');

module.exports.cardCreateValidation = {
  body: Joi.object().keys({
    name: Joi.string()
      .required()
      .min(2)
      .max(30),
    link: Joi.string()
      .regex(/(https?:\/\/)(www\.)?((\w+\.\w{2,})|(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}))(:\d{2,5})?.*#?/i)
      .required(),
  }),
};
