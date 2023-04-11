const {authService, emailService, userService, actionTokenService} = require("../services");
const {WELCOME, FORGOT_PASS} = require("../enums/email-actions.enum");
const {FORGOT_PASSWORD} = require("../enums/token-actions.enum");
const {FRONTEND_URL} = require("../configs/config");

module.exports = {
    login: async (req, res, next) => {
        try {
            const {user, body} = req;

            await emailService.sendEmail('denyk.yevhen@gmail.com', WELCOME, {userName: user.name})

            await authService.deleteManyByUserId(user._id)

            await authService.comparePassword(user.password, body.password)

            const tokenPair = authService.generateAccessTokenPair({id: user._id});

            const accessHashToken = await authService.hashToken(tokenPair.accessToken);
            const refreshHashToken = await authService.hashToken(tokenPair.refreshToken);

            await authService.createInAuthBase(user._id, accessHashToken, refreshHashToken)


            res.json({user, ...tokenPair})

        } catch (e) {
            next(e)
        }
    },
    refresh: async (req, res, next) => {
        try {
            const {refreshToken, _user_id} = req.tokenInfo;

            await authService.deleteOneByRefresh(refreshToken)

            const tokenPair = authService.generateAccessTokenPair({id: _user_id});

            const accessHashToken = await authService.hashToken(tokenPair.accessToken);
            const refreshHashToken = await authService.hashToken(tokenPair.refreshToken);

            await authService.createInAuthBase(_user_id, accessHashToken, refreshHashToken)

            res.status(201).json(tokenPair)

        } catch (e) {
            next(e)
        }
    },
    forgotPassword: async (req, res, next) => {
        try {
            const user = req.user

            const actionToken = await authService.generateActionToken(FORGOT_PASSWORD, {email: user.email});
            const forgotPassFEUrl = `${FRONTEND_URL}/password/new?token=${actionToken}`

            await emailService.sendEmail('denyk.yevhen@gmail.com', FORGOT_PASS, {url: forgotPassFEUrl});

            await actionTokenService.create(user._id, actionToken, FORGOT_PASSWORD)

            res.json('ok');
        } catch (e) {
            next(e);
        }
    },
    setPasswordAfterForgot: async (req, res, next) => {
        try {
            const {user, actionToken} = req

            const hashPassword = await authService.hashPassword(req.body.password);

            await userService.updateOne({_id: user._id}, {password: hashPassword});

            await actionTokenService.deleteActionToken(actionToken)

            res.json('ok');
        } catch (e) {
            next(e);
        }
    },

}


