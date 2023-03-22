const {userService} = require("../services");

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await userService.findByParams();
            res.json(users);
        } catch (e) {
            next(e);
        }
    },
    createUser: async (req, res, next) => {
        try {
            const newUser = await userService.create(req.body);
            res.status(201).json(newUser)
        } catch (e) {
            next(e)
        }
    },
    getUserById: async (req, res, next) => {
        try {
            res.json(req.user)
        } catch (e) {
            next(e)
        }
    },
    updateUser: async (req, res, next) => {
        try {
            const {userID} = req.params

            const user = await userService.updateOne(userID, req.body);

            res.status(201).json( user)
        } catch (e) {
            next(e)
        }
    },
    deleteUser: async (req, res, next) => {
        try {
            const {userID} = req.params

            await userService.deleteById(userID)

            res.sendStatus(204)

        } catch (e) {
            next(e)
        }
    },
}