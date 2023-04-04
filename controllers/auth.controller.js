const {authService,emailService} = require("../services");
const {WELCOME} = require("../enums/email-actions.enum");

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
}
