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
    checkDataUserUpdated: (req, res, next) => {
        try {
            const updateUser = req.body;

            if (updateUser.age < 0 || updateUser.age > 120 || typeof updateUser.age !== "number") {
                throw new ApiError('Bad request, age incorrect', 400)
            }
            if (updateUser.name.length < 2 || typeof updateUser.name !== "string") {
                throw new ApiError('Bad request, name incorrect', 400)
            }

            req.updateUser = updateUser;
            next()

        } catch (e) {
            next(e)
        }
    },
    checkDataCreateUser: (req, res, next) => {
        try {
            const user = req.body;

            if (user.age < 0 || user.age > 120 || typeof user.age !== "number") {
                throw new ApiError('Bad request, age incorrect', 400)
            }
            if (user.name.length < 2 || typeof user.name !== "string") {
                throw new ApiError('Bad request, name incorrect', 400)
            }

            req.user = user
            next()
        }catch (e) {
            next (e)
        }
    }

}