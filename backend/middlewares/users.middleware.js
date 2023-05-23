const ApiError = require("../error/apiError");
const {userService} = require("../services");
const {userNormalizer} = require("../helper");
const {commonValidator, userValidator} = require("../validators");
const User = require('../dataBase/User')

module.exports = {
     getUserDynamically: (fieldName, from = 'body', dbField = fieldName) => async (req, res, next) => {
        try {
            const fieldToSearch = req[from][fieldName];

            const user = await User.findOne({[dbField]: fieldToSearch})

            if (!user) {
                throw new ApiError(`User not found`, 404);
            }

            req.user = user

            next();
        } catch (e) {
            next(e);
        }
    },
    isUserIdValid: async (req, res, next) => {
        try {
            const {userId} = req.params

            const validate = commonValidator.idValidator.validate(userId);

            if (validate.error) {
                throw new ApiError(validate.error.message, 400)
            }

            next()
        } catch (e) {
            next(e)
        }
    },
    isBodyCreateValid: async (req, res, next) => {
        try {
            const {body} = req

            const validate = userValidator.newUserValidators.validate(body);

            if (validate.error) {
                throw new ApiError(validate.error.message, 400)
            }

            req.body = validate.value

            next()
        } catch (e) {
            next(e)
        }
    },

    isBodyUpdateValid: async (req, res, next) => {
        try {

            const validate = userValidator.editUseValidator.validate(req.body);

            if (validate.error) {
                throw new ApiError(validate.error.message, 400)
            }

            req.body = validate.value

            next()
        } catch (e) {
            next(e)
        }
    },
    checkIsEmailUnique: async (req, res, next) => {
        try {
            const {email} = req.body

            if (!email) {
                throw new ApiError(`Email not present`, 400);
            }

            const user = await userService.findOne({email: email});

            if (user) {
                throw new ApiError(`User with this email already exists`, 409);
            }

            next()
        } catch (e) {
            next(e)
        }

    },
    userNormalizer: async (req, res, next) => {
        try {

            let {name} = req.body

            if (name) {
                req.body.name = userNormalizer.name(name)
            }

            next()
        } catch (e) {
            next(e)
        }
    },
}