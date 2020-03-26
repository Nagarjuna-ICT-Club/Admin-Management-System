const Joi = require("@hapi/joi");

module.exports = {
  studentRegistrationValidation: data => {
    const schema = Joi.object({
      full_name: Joi.string()
        .min(6)
        .max(30)
        .required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{8,30}$"))
        .required(),
      program: Joi.string.required()
    });

    return schema.validate(data)
  }
};
