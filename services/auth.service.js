const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const ApiError = require("../error/apiError");
const OAuth = require("../dataBase/OAuth");

const {
    ACCESS_SECRET,
    REFRESH_SECRET,
    CONFIRM_ACCOUNT_ACTION_TOKEN_SECRET,
    FORGOT_PASSWORD_ACTION_TOKEN_SECRET
} = require("../configs/config");
const {tokenTypeEnum} = require("../enums");
const tokenTypes = require("../enums/token-actions.enum");


module.exports = {
    hashPassword: async (password) => {
        return bcrypt.hash(password, 10)
    },
    comparePassword: async (hashPassword, password) => {
        const isPasswordsSame = await bcrypt.compare(password, hashPassword);

        if (!isPasswordsSame) {
            throw new ApiError("Wrong email or password", 400)
        }

    },
    compareOldPassword: (hashPassword, password) => {
        return bcrypt.compare(password, hashPassword);
    },

    hashToken: (token) => bcrypt.hash(token, 10),
    compareToken: async (hashToken, token) => {
        const isTokenSame = await bcrypt.compare(token, hashToken);

        if (!isTokenSame) {
            throw new ApiError('Token not valid', 401)
        }
    },

    generateAccessTokenPair: (dataToSign = {}) => {
        const accessToken = jwt.sign(dataToSign, ACCESS_SECRET, {expiresIn: '1m'});
        const refreshToken = jwt.sign(dataToSign, REFRESH_SECRET, {expiresIn: '1h'});

        return {
            accessToken,
            refreshToken
        }
    },
    checkTokenPair: (token = '', tokenType = tokenTypeEnum.accessToken) => {
        try {

            let secret = ''
            if (tokenType === tokenTypeEnum.accessToken) secret = ACCESS_SECRET;
            else if (tokenType === tokenTypeEnum.refreshToken) secret = REFRESH_SECRET;

            return jwt.verify(token, secret)

        } catch (e) {
            throw new ApiError('Token not valid', 401);
        }
    },

    generateActionToken: (actionTokenType, dataToSign = {}) => {
        let secretWord = ''

        switch (actionTokenType) {
            case tokenTypes.CONFIRM_ACCOUNT:
                secretWord = CONFIRM_ACCOUNT_ACTION_TOKEN_SECRET;
                break;
            case tokenTypes.FORGOT_PASSWORD:
                secretWord = FORGOT_PASSWORD_ACTION_TOKEN_SECRET;
                break;
        }

        return jwt.sign(dataToSign, secretWord, {expiresIn: '7d'});
    },
    checkActionToken: (token = '', actionTokenType) => {
        try {
            let secretWord = ''

            switch (actionTokenType) {
                case tokenTypes.CONFIRM_ACCOUNT:
                    secretWord = CONFIRM_ACCOUNT_ACTION_TOKEN_SECRET;
                    break;
                case tokenTypes.FORGOT_PASSWORD:
                    secretWord = FORGOT_PASSWORD_ACTION_TOKEN_SECRET;
                    break;
            }

            return jwt.verify(token, secretWord)

        } catch (e) {
            throw new ApiError('Token not valid', 401);
        }
    },


    findByUserId: async (_user_id) => {
        return OAuth.findOne({_user_id})
    },
    createInAuthBase: async (_user_id, accessToken, refreshToken) => {
        return OAuth.create({
            _user_id,
            accessToken,
            refreshToken,
        })
    },
    deleteManyByUserId: async (_user_id) => {
        return OAuth.deleteMany({_user_id})
    },
    deleteOneByRefresh: async (refreshToken) => {
        await OAuth.deleteOne({refreshToken})
    }
}