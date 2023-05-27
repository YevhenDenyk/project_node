const Joi = require("joi");

const regex = require("../enums/regex.enum");

module.exports = {
    idValidator: Joi.string().regex(regex.MONGO_ID)
}
