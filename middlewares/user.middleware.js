const {userServices} = require("../services");
const ApiError = require("../errors/ApiError");
const {userNormalizer} = require('../helper')

module.exports = {
    checkIsUserExist: async (req, res, next) => {
        try {
            const {userId} = req.params;

            const user = await userServices.findById( userId)

            if (!user) {
                throw new ApiError('User not found', 404)
            }

            next()

        } catch (e) {
            next(e)
        }
    },
    checkIsUserExistAndReturn: async (req, res, next) => {
        try {
            const {userId} = req.params;

            const user = await userServices.findOne({_id: userId})

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
            const {age, name, email} = req.body;

            if (!age || age < 0 || age > 120 || typeof age !== "number") {
                throw new ApiError('Bad request, age incorrect', 400)
            }
            if (!name || name.length < 2 || typeof name !== "string") {
                throw new ApiError('Bad request, name incorrect', 400)
            }
            if (!email || !email.includes('@') || typeof email !== "string") {
                throw new ApiError('Bad request, email incorrect', 400)
            }

            next()

        } catch (e) {
            next(e)
        }
    },
    checkDataUserUpdated: (req, res, next) => {
        try {
            const {age, name, email} = req.body;

            if (age && (age < 0 || age > 120 || typeof age !== "number")) {
                throw new ApiError('Bad request, age incorrect', 400)
            }
            if (name && (name.length < 2 || typeof name !== "string")) {
                throw new ApiError('Bad request, name incorrect', 400)
            }
            if (email && (!email || !email.includes('@') || typeof email !== "string")) {
                throw new ApiError('Bad request, email incorrect', 400)
            }

            next()
        } catch (e) {
            next(e)
        }
    },
    checkIsEmailExist:async (req, res, next) => {
        try {
            const {email} = req.body

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
            const {email, name} = req.body

            if (email) {
                req.body.email = email.toLowerCase()
            }
            if (name) {
                req.body.name = userNormalizer.name(name)
            }

            next()
        } catch (e) {
            next(e)
        }
    },
}
