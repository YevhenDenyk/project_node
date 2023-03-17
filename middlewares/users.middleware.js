const ApiError = require("../error/apiError");
const {fileService} = require("../services");
module.exports = {
    isParamsValid: async (req, res, next) => {
        try {
            const {userID} = req.params

            if (userID < 0 || typeof +userID !== "number") {
                throw new ApiError('User ID in params no valid', 400)
            }

            next()
        } catch (e) {
            next(e)
        }
    },
    isUserExist: async (req, res, next) => {
        try {
            const {userID} = req.params;
            const users = await fileService.readerFile();

            const user = users.find(u => u.id === +userID);
            if (!user) {
                throw new ApiError(`User with id: ${userID} not found`, 404);
            }

            req.user = user;
            req.users = users;
            next();

        } catch (e) {
            next(e);
        }
    },
    isBodyCreateValid: async (req, res, next) => {
        try {
            const {age, name} = req.body

            if (age < 0 || age > 120 || typeof age !== "number") {
                throw new ApiError('Age no valid', 400)
            }
            if (name.length < 3 || typeof name !== "string") {
                throw new ApiError('Name no valid', 400)
            }

            next()
        } catch (e) {
            next(e)
        }
    },
    isBodyUpdateValid: async (req, res, next) => {
        try {
            const {age, name} = req.body

            if (age && (age < 0 || age > 120 || typeof age !== "number")) {
                throw new ApiError('Age no valid', 400)
            }
            if (name && (name.length < 3 || typeof name !== "string")) {
                throw new ApiError('Name no valid', 400)
            }

            next()
        } catch (e) {
            next(e)
        }
    },

}