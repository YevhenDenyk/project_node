const {userService, emailService} = require("../services");
const {WELCOME, DELETE_ACCOUNT} = require("../enums/email-actions.enum");

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
            const newUser = await userService.createUserWithHashPassword(req.body);

            await emailService.sendEmail(newUser.email, WELCOME, {userName: newUser.name})

            res.status(201).json(newUser)
        } catch (e) {
            next(e)
        }
    },
    getUserById: async (req, res, next) => {
        try {
            const userWithCars = await userService.findByIdWithCars(req.user._id);

            res.json(userWithCars)
        } catch (e) {
            next(e)
        }
    },
    updateUser: async (req, res, next) => {
        try {
            const {userID} = req.params

            const user = await userService.updateOne(userID, req.body);

            res.status(201).json(user)
        } catch (e) {
            next(e)
        }
    },
    deleteUser: async (req, res, next) => {
        try {
            const {userID} = req.params
            const {email, name} = req.user

            await userService.deleteById(userID)

            await emailService.sendEmail(email, DELETE_ACCOUNT, {userName: name})

            res.sendStatus(204)
        } catch (e) {
            next(e)
        }
    },
}