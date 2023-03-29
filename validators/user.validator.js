const Joi = require('joi');
const regexp = require('../configs/regexp.enum')

module.exports = {
    newUserValidators: Joi.object({
        name: Joi.string().required().min(2).max(20),
        email: Joi.string().required().regex(regexp.EMAIL).lowercase().trim(),
        password: Joi.string().required().regex(regexp.PASSWORD),
        age: Joi.number().required().integer().min(1).max(120)
    }),
    editUseValidator: Joi.object({
        name: Joi.string().optional().min(2).max(20),
        email: Joi.string().optional().regex(regexp.EMAIL).lowercase().trim(),
        age: Joi.number().optional().integer().min(1).max(120)
    }),
}
