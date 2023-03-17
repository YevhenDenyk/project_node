const {fileServices} = require("../services");
const ApiError = require("../errors/ApiError");

module.exports={
    checkIsUserExist: async (req, res, next) => {
        try {
            const {userId} = req.params;

            const users = await fileServices.reader()

            const user = users.find(u => u.id === +userId);

            if (!user) {
                throw new ApiError('User not found',404 )
            }

            req.user = user;
            req.users = users;
            next()

        }catch (e) {
            next(e)
        }
    },
    checkDataCreateUser: (req, res, next) => {
        try {
            const {age, name} = req.body;

            if (!age || age < 0 || age > 120 || typeof age !== "number") {
                throw new ApiError('Bad request, age incorrect', 400)
            }
            if (!name || name.length < 2 || typeof name !== "string") {
                throw new ApiError('Bad request, name incorrect', 400)
            }

            next()

        } catch (e) {
            next(e)
        }
    },
    checkDataUserUpdated: (req, res, next) => {
        try {
            const {age, name} = req.body;

            if (age && (age < 0 || age > 120 || typeof age !== "number")) {
                throw new ApiError('Bad request, age incorrect', 400)
            }
            if (name && (name.length < 2 || typeof name !== "string")) {
                throw new ApiError('Bad request, name incorrect', 400)
            }

            next()
        }catch (e) {
            next (e)
        }
    },
    isIdValid: (req, res, next) => {
        try {
            const {userId} = req.params

            if (userId < 0 || Number.isNaN(+userId)) {
                throw new ApiError('Not valid ID', 400);
            }

            next()
        }catch (e) {
            next (e)
        }
    }

}