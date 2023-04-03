const Joi = require("joi");

const {MONGO_ID} = require("../configs/regex.enum");

module.exports = {
    createCarValidator: Joi.object({
        model: Joi.string().required().min(2).max(15),
        year: Joi.number().required().integer().min(1990).max(new Date().getFullYear()),
        price: Joi.number().required().integer().min(1).max(9999999),
        _user_id: Joi.string().required().regex(MONGO_ID),
    }),
    updateCarValidator: Joi.object({
        model: Joi.string().optional().min(2).max(15),
        year: Joi.number().optional().integer().min(1990).max(new Date().getFullYear()),
        price: Joi.number().optional().integer().min(1).max(9999999),
        _user_id: Joi.string().optional().regex(MONGO_ID),
    }),

}
