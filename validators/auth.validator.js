const Joi = require("joi");

const regex = require("../enums/regex.enum");

module.exports = {
    loginValidator: Joi.object({
        email: Joi.string().required().regex(regex.EMAIL).lowercase().trim(),
        password: Joi.string().required().regex(regex.PASSWORD),
    }),
    emailValidator: Joi.object({
        email: Joi.string().required().regex(regex.EMAIL).lowercase().trim()
    }),
    passwordValidator: Joi.object({
        password: Joi.string().required().regex(regex.PASSWORD)
    }),
}
