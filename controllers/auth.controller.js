const {authServices, emailServices} = require("../services");
const {WELCOME} = require("../enums/email-action.enum");


module.exports = {
    loginController: async (req, res, next) => {
        try {
            const {user, body} = req

            await authServices.comparePassword(user.password, body.password)

            await authServices.deleteAllTokenPairThisUserInDB(user._id)

            const tokenPair = authServices.generateTokenPair({id: user._id})

            const hashAccessToken = await authServices.hashToken(tokenPair.accessToken)
            const hashRefreshToken = await authServices.hashToken(tokenPair.refreshToken)

            await authServices.createTokenToBd({
                _user_id: user._id,
                accessToken: hashAccessToken,
                refreshToken: hashRefreshToken,
            })

            await emailServices.sendEmail('denyk.yevhen@gmail.com', WELCOME, {userName: user.name})

            res.json({...tokenPair, user});
        } catch (e) {
            next(e);
        }
    },

    refreshController: async (req, res, next) => {
        try {
            const {tokenInfo} = req

            await authServices.deleteTokenPairById(tokenInfo._id)

            const tokenPair = authServices.generateTokenPair({id: tokenInfo._user_id})

            const hashAccessToken = await authServices.hashToken(tokenPair.accessToken)
            const hashRefreshToken = await authServices.hashToken(tokenPair.refreshToken)

            await authServices.createTokenToBd({
                _user_id: tokenInfo._user_id,
                accessToken: hashAccessToken,
                refreshToken: hashRefreshToken,
            })

            res.json({...tokenPair});
        } catch (e) {
            next(e);
        }
    },

    logoutController: async (req, res, next) => {
        try {
            const {tokenInfo} = req

            await authServices.deleteTokenPairById(tokenInfo._id)

            res.sendStatus(204)

        } catch (e) {
            next(e);
        }
    },

}
