const userDb = require("../dataBase/users");
const ApiError = require('../errors/apiError');

module.exports = {
    checkIsUserExist: (req, res, next) => {
        try {
            const {userId} = req.params;

            const user = userDb[userId]

            if (!user) {
                throw new ApiError("User not found",404);
            }
            req.user = user;
            next();

        } catch (e) {
            next(e)
        }
    }
}