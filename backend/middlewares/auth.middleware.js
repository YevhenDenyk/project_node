const {authValidator} = require("../validators");
const ApiError = require("../errors/ApiError");
const {authServices, actionTokenServices, oldPasswordServices} = require("../services");
const {tokenTypeEnums} = require("../enums");

module.exports = {
    isValidBody: async (req, res, next) => {
        try {
            const validate = authValidator.loginValidator.validate(req.body);

            if (validate.error) {
                throw new ApiError(validate.error.message, 400)
            }

            next();
        } catch (e) {
            next(e);
        }
    },
    isValidEmail: async (req, res, next) => {
        try {
            const validate = authValidator.emailValidator.validate(req.body);

            if (validate.error) {
                throw new ApiError(validate.error.message, 400)
            }

            req.body = validate.value

            next();
        } catch (e) {
            next(e);
        }
    },
    isValidPassword: async (req, res, next) => {
        try {
            const validate = authValidator.passwordValidator.validate(req.body);

            if (validate.error) {
                throw new ApiError(validate.error.message, 400)
            }

            next();
        } catch (e) {
            next(e);
        }
    },
    checkAccessToken: async (req, res, next) => {
        try {
            const accessToken = req.get('Authorization')

            const payload = await authServices.checkTokenPair(accessToken);

            const tokenInfo = await authServices.findTokenByIdUser(payload.id);

            await authServices.compareToken(tokenInfo.accessToken, accessToken)

            req.tokenInfo = tokenInfo

            next();
        } catch (e) {
            next(e);
        }
    },
    checkRefreshToken: async (req, res, next) => {
        try {
            const refreshToken = req.get('Authorization')

            const payload = await authServices.checkTokenPair(refreshToken, tokenTypeEnums.refreshToken);

            const tokenInfo = await authServices.findTokenByIdUser(payload.id);

            await authServices.compareToken(tokenInfo.refreshToken, refreshToken)

            req.tokenInfo = tokenInfo

            next();
        } catch (e) {
            next(e);
        }
    },
    checkActionToken: (actionTokenType) => async (req, res, next) => {
        try {
            const actionToken = req.get('Authorization')

            await authServices.checkActionToken(actionToken, actionTokenType);

            const tokenInfo = await actionTokenServices.findOneAndPopulate({actionToken});

            if (!tokenInfo) {
                throw new ApiError('Token not valid', 401)
            }

            req.user = tokenInfo._user_id

            next();
        } catch (e) {
            next(e);
        }
    },
    checkOldPassword: async (req, res, next) => {
        try {
            const {user, body} = req;

            const oldPasswords = await oldPasswordServices.find(user._id);
            oldPasswords.push({oldPassword: user.password});

            const results = await Promise.all(oldPasswords.map((record) => authServices.compareOldPassword(record.oldPassword, body.password)))

            const conditions = results.some((result) => result)

            if (conditions) {
                throw new ApiError('This is old password', 409)
            }

            next();
        } catch (e) {
            next(e);
        }
    },
}
