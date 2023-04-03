const {userServices, authServices} = require("../services");

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await userServices.findByParams();

            res.json(users);
        } catch (e) {
            next(e)
        }
    },

    createUser: async (req, res, next) => {
        try {
            const hashPassword = await authServices.hashPassword(req.newUser.password);

            const user = await userServices.createOne({...req.newUser, password: hashPassword})

            res.status(201).json(user);
        } catch (e) {
            next(e)
        }
    },
    getUserById: async (req, res, next) => {
        try {
            const userWithCars = await userServices.findBuIdWithCars(req.user._id);

            res.json(userWithCars)
        } catch (e) {
            next(e)
        }
    },
    updateUser: async (req, res, next) => {
        try {
            const {newUser, params} = req

            const user = await userServices.findByIdAndUpdate(params.userId, newUser)

            res.status(201).json(user);

        } catch (e) {
            next(e)
        }
    },
    deleteUser: async (req, res, next) => {
        try {
            const {userId} = req.params

            await userServices.findByIdAndDelete(userId)

            res.sendStatus(204)

        } catch (e) {
            next(e)
        }
    }
}