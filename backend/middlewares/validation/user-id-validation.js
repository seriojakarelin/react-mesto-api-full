const { Joi } = require('celebrate');

module.exports.userIdValidation = {
  params: Joi.object().keys({
    id: Joi.string()
      .alphanum()
      .length(24),
  }),
};
