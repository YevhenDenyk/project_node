const Joi = require('joi');

const regex = require("../configs/regex.enum");

module.exports = {
    createUserValidators: Joi.object({
        name: Joi.string().required().min(3).max(25).trim(),
        age: Joi.number().required().integer().min(1).max(120).default(18),
        email: Joi.string().required().regex(regex.EMAIL).lowercase().trim(),
        password: Joi.string().required().regex(regex.PASSWORD),
    }),
     editUserValidators: Joi.object({
        name: Joi.string().optional().min(3).max(25).trim(),
        age: Joi.number().optional().integer().min(1).max(120).default(18),
        email: Joi.string().optional().regex(regex.EMAIL).lowercase().trim(),
    }),

}