const {userService, emailService, smsService} = require("../services");
const {smsTypeEnum, emailActionsEnum} = require("../enums");
const {smsTemplate} = require("../helper");

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

            await emailService.sendEmail(newUser.email, emailActionsEnum.WELCOME, {userName: newUser.name})
            await smsService.sendSms(smsTemplate[smsTypeEnum.WELCOME](newUser.name), newUser.phone)

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
            const {email, name, phone} = req.user

            await Promise.allSettled([
                userService.deleteById(userID),
                emailService.sendEmail(email, emailActionsEnum.DELETE_ACCOUNT, {userName: name}),
                smsService.sendSms(smsTemplate[smsTypeEnum.DELETE_ACCOUNT](), phone)
            ])

            res.sendStatus(204)
        } catch (e) {
            next(e)
        }
    },

}
