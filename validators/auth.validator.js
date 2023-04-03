const Joi = require("joi");

const regex = require("../configs/regex.enum");

module.exports = {
    loginValidator: Joi.object({
        email: Joi.string().required().regex(regex.EMAIL).lowercase().trim(),
        password: Joi.string().required().regex(regex.PASSWORD),
    })
}
