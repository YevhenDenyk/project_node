const ApiError = require("../error/apiError");

const {authValidator} = require('../validators')
const {authService} = require("../services");
const {tokenTypeEnum} = require("../enums");


module.exports = {
    isBodyValid: async (req, res, next) => {
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
            const accessToken = req.get('Authorization');

            if (!accessToken) {
                throw new ApiError("No token", 401)
            }

            const payload = authService.checkTokenPair(accessToken);

            const tokenInfo = await authService.findByUserId(payload.id)

            await authService.compareToken(tokenInfo.accessToken, accessToken)

            next();
        } catch (e) {
            next(e);
        }
    },
    checkRefreshToken: async (req, res, next) => {
        try {
            const refreshToken = req.get('Authorization');

            if (!refreshToken) {
                throw new ApiError("No token", 401)
            }

            const payload = authService.checkTokenPair(refreshToken, tokenTypeEnum.refreshToken);

            const tokenInfo = await authService.findByUserId(payload.id)

            await authService.compareToken(tokenInfo.refreshToken, refreshToken)

            req.tokenInfo = tokenInfo
            next();
        } catch (e) {
            next(e);
        }
    },
}