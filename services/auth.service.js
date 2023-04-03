const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const ApiError = require("../errors/ApiError");
const config = require("../configs/config");
const {tokenTypeEnums} = require("../enums");
const OAuth = require('../dataBase/OAuth');

module.exports = {
    hashPassword: async (password) => {
        return bcrypt.hash(password, 10)
    },

    comparePassword: async (hashPassword, password) => {
        const isPasswordSame = bcrypt.compare(password, hashPassword);

        if (!isPasswordSame) {
            throw new ApiError('Wrong password', 400)
        }
    },

    hashToken: async (token) => {
        return bcrypt.hash(token, 10)
    },

    compareToken: async (hashToken, token) => {
        const isPasswordSame = bcrypt.compare(token, hashToken);

        if (!isPasswordSame) {
            throw new ApiError('Wrong token', 400)
        }
    },

    generateTokenPair: (dataToSing = {}) => {
        const accessToken = jwt.sign(dataToSing, config.ACCESS_SECRET, {expiresIn: '1m'});
        const refreshToken = jwt.sign(dataToSing, config.REFRESH_SECRET, {expiresIn: '1h'});

        return {
            accessToken,
            refreshToken
        };
    },
    checkTokenPair: (token = '', tokenType = tokenTypeEnums.accessToken) => {
        try {
            let secret = ''

            if (tokenType === tokenTypeEnums.accessToken) {
                secret = config.ACCESS_SECRET
            } else if (tokenType === tokenTypeEnums.refreshToken) {
                secret = config.REFRESH_SECRET
            }

            return jwt.verify(token, secret)
        } catch (e) {
            throw new ApiError('Token not valid', 401)
        }
    },

    createTokenToBd: async (data) => {
        return OAuth.create(data)
    },
    findTokenByIdUser: async (_user_id) => {
        return OAuth.findOne({_user_id})
    },
    deleteAllTokenPairThisUserInDB: async (_user_id) => {
        return OAuth.deleteMany({_user_id})
    },
    deleteTokenPairById: async (_id) => {
        return OAuth.deleteOne({_id})
    },
}