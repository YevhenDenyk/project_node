const {userServices} = require("../services");
const ApiError = require("../errors/ApiError");
const {userNormalizer} = require('../helper')
const {commonValidator, userValidator} = require("../validators");

module.exports = {
    checkIsIdValid: async (req, res, next) => {
        try {
            const {userId} = req.params;

            const validate = commonValidator.idValidator.validate(userId);

            if (validate.error) {
                throw new ApiError(validate.error.message, 400)
            }

            next()

        } catch (e) {
            next(e)
        }
    },
    getUserDynamically: (fieldName, from = 'body', dbField = fieldName) => async (req, res, next) => {
        try {
            const fieldToSearch = req[from][fieldName];

            const user = await userServices.findOne({[dbField]: fieldToSearch})

            if (!user) {
                throw new ApiError('User not found', 404)
            }

            req.user = user;
            next()

        } catch (e) {
            next(e)
        }
    },

    checkDataCreateUser: (req, res, next) => {
        try {

            const validate = userValidator.createUserValidators.validate(req.body);

            if (validate.error) {
                throw new ApiError(validate.error.message, 400)
            }

            req.newUser = validate.value

            next()
        } catch (e) {
            next(e)
        }
    },
    checkDataUserUpdated: (req, res, next) => {
        try {

            const validate = userValidator.editUserValidators.validate(req.body);

            if (validate.error) {
                throw new ApiError(validate.error.message, 400)
            }

            req.newUser = validate.value

            next()
        } catch (e) {
            next(e)
        }
    },
    checkIsEmailExist: async (req, res, next) => {
        try {
            const {email} = req.newUser

            const user = await userServices.findOne({email: email})

            if (user) {
                throw new ApiError('Email exist', 409)
            }

            next()
        } catch (e) {
            next(e)
        }
    },
    dataNormalizer: (req, res, next) => {
        try {
            const {name} = req.body

            if (name) {
                req.body.name = userNormalizer.name(name)
            }

            next()
        } catch (e) {
            next(e)
        }
    },
    checkIsAvatarExist: async (req, res, next) => {
        try {

            if (!req.user.avatar) {
                throw new ApiError(`User ${req.user.name} didn't have avatar`, 400)
            }

            next();
        } catch (e) {
            next(e);
        }
    },
}
