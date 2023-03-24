const {userServices} = require("../services");

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await userServices.findByParams();

            res.json(users);
        }catch (e) {
            next (e)
        }
    },

    createUser: async (req, res, next) => {
        try {
            const user = await userServices.createOne(req.body)

            res.status(201).json(user);
        }catch (e) {
            next (e)
        }
    },
    getUserById: async (req, res, next) => {
        try {
            const user = req.user

            res.json(user)
        }catch (e) {
            next (e)
        }
    },
    updateUser: async (req, res, next) => {
        try {
            const { body, params } = req

           const user =  await userServices.findByIdAndUpdate(params.userId, body)

            res.status(201).json(user);

        }catch (e) {
            next (e)
        }
    },
    deleteUser:async (req, res, next) => {
        try {
            const {userId} = req.params

            await userServices.findByIdAndDelete(userId)

            res.sendStatus(204)

        }catch (e) {
            next (e)
        }
    }
}