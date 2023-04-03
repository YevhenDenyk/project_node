const {authValidator} = require("../validators");
const ApiError = require("../errors/ApiError");
const {authServices} = require("../services");
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
    checkAccessToken: async (req, res, next) => {
        try {
            const accessToken = req.get('Authorization')

            const payload = await authServices.checkTokenPair(accessToken);

            const tokenInfo = await authServices.findTokenByIdUser(payload.id);

            await authServices.compareToken( tokenInfo.accessToken , accessToken)

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

            await authServices.compareToken( tokenInfo.refreshToken , refreshToken)

            req.tokenInfo = tokenInfo

            next();
        } catch (e) {
            next(e);
        }
    },
}
