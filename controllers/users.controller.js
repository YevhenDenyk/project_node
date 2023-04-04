const {userService,authService, emailService} = require("../services");
const {FORGOT_PASS} = require("../enums/email-actions.enum");

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
            const hashPassword = await authService.hashPassword(req.body.password);

            const newUser = await userService.create({...req.body, password: hashPassword});

            res.status(201).json(newUser)
        } catch (e) {
            next(e)
        }
    },
    getUserById: async (req, res, next) => {
        try {
            const userWithCars = await userService.findByIdWithCars(req.user._id);

            await emailService.sendEmail('denyk.yevhen@gmail.com', FORGOT_PASS)

            res.json(userWithCars)
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