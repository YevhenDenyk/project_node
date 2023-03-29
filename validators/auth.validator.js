const Joi = require("joi");
const regexp = require("../configs/regexp.enum");

module.exports = {
    loginValidator: Joi.object({
        email: Joi.string().required().regex(regexp.EMAIL).lowercase().trim(),
        password: Joi.string().required().regex(regexp.PASSWORD),
    }),
}