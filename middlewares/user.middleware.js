const {fileService} = require("../services");
const ApiError = require('../error/ApiError')

module.exports = {
    checkIsUserExist: async (req, res, next) => {
        try {
            const {userID} = req.params;

            const users = await fileService.readFile()
            const user = users.find(user => user.id === +userID)

            if (!user) {
                throw new ApiError(`User ${userID} not found`, 404)
            }

            req.users = users
            req.user = user

            next()
        } catch (e) {
            next(e)
        }
    },
    isBodyValidCreate: async (req, res, next) => {
        try {
            const {name, age} = req.body;

            if (age < 0 || age > 110 || typeof age !== "number") {
                throw new ApiError('User age not valid', 400)
            }
            if (name.length < 3 || typeof name !== "string") {
                throw new ApiError('User name not valid', 400)
            }
            next()

        } catch (e) {
            next(e)
        }
    },
    isBodyValidUpdate: async (req, res, next) => {
        try {
            const {name, age} = req.body;

            if (age && (age < 0 || age > 110 || typeof age !== "number")) {
                throw new ApiError('User age not valid', 400)
            }
            if (name && (name.length < 3 || typeof name !== "string")) {
                throw new ApiError('User name not valid', 400)
            }
            next()
        } catch (e) {
            next(e)
        }
    },
    isParamsValid: async (req, res, next) => {
        try {
            const {userId} = req.params
            if (userId < 0 || typeof +userId !== "number") {
                throw new ApiError('User ID in params not valid', 400)
            }

            next()
        } catch (e) {
            next(e)
        }
    }
}