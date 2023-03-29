const Joi = require("joi");
const {MONGO_ID} = require("../configs/regexp.enum");

module.exports = {
    newCarValidator: Joi.object({
        model: Joi.string().required().min(3).max(15).trim(),
        price: Joi.number().required().min(1).max(9999999),
        year: Joi.number().required().min(1990).max(new Date().getFullYear()),
        user: Joi.string().required().regex(MONGO_ID)
    }),
    editCarValidator: Joi.object({
        model: Joi.string().optional().min(3).max(15).trim(),
        price: Joi.number().optional().min(1).max(9999999),
        year: Joi.number().optional().min(1990).max(new Date().getFullYear()),
        user: Joi.string().optional().regex(MONGO_ID)
    }),

}