const {authServices, emailServices, actionTokenServices, userServices} = require("../services");
const {emailTypeEnums, actionTokenTypeEnums} = require("../enums");
const {FRONTEND_URL} = require("../configs/config");


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
            const {_id, _user_id} = req.tokenInfo

            await authServices.deleteTokenPairById(_id)

            const user = await userServices.findById(_user_id);

            await emailServices.sendEmail(user.email, emailTypeEnums.LOGOUT, {userName: user.name })

            res.sendStatus(204)

        } catch (e) {
            next(e);
        }
    },

    forgotPasswordController: async (req, res, next) => {
        try {
            const {_id, email, name} = req.user

            const actionToken = authServices.generateActionToken({email: email}, actionTokenTypeEnums.FORGOT_PASSWORD);

            await actionTokenServices.create(_id, actionToken, actionTokenTypeEnums.FORGOT_PASSWORD)

            const generateLink = `${FRONTEND_URL}/forgot_password/?token=${actionToken}`

            await emailServices.sendEmail(email, emailTypeEnums.FORGOT_PASS, {
                url: generateLink,
                userName: name
            })

            res.json('ok');
        } catch (e) {
            next(e);
        }
    },

    newForgotPasswordController: async (req, res, next) => {
        try {
            const {body, user} = req
            const actionToken = req.get('Authorization')

            const hashPassword = await authServices.hashPassword(body.password);

            await userServices.findByIdAndUpdate(user._id, {password: hashPassword});

            await actionTokenServices.delete({actionToken})

            res.json('ok');
        } catch (e) {
            next(e);
        }
    },

}
