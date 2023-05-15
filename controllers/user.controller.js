const {userServices, authServices, emailServices, smsServices, s3Services} = require("../services");
const {WELCOME} = require("../enums/email-action.enum");
const {emailTypeEnums, smsTypeEnums} = require("../enums");
const {smsTemplate} = require("../helper");
const {userRepository} = require("../repositories");
const {userPresenter} = require("../presenters");

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const data = await userRepository.find(req.query)

            data.users = userPresenter.normalizeUsers(data.users)

            res.json(data);
        } catch (e) {
            next(e)
        }
    },

    createUser: async (req, res, next) => {
        try {
            const hashPassword = await authServices.hashPassword(req.newUser.password);

            const user = await userServices.createOne({...req.newUser, password: hashPassword})

            await emailServices.sendEmail(user.email, WELCOME, {userName: user.name})

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
            const {name, email, phone} = req.user

            await Promise.allSettled([

                userServices.findByIdAndDelete(userId),

                emailServices.sendEmail(email, emailTypeEnums.DELETE_ACCOUNT, {name}),

                smsServices.sendSms(smsTemplate[smsTypeEnums.DELETE_ACCOUNT](name), phone),
            ])

            res.sendStatus(204)

        } catch (e) {
            next(e)
        }
    },
    uploadAvatar: async (req, res, next) => {
        try {
            const {user, files} = req;

            const sendData = await s3Services.uploadPublicFile(files.avatar, "user", user._id);

            const updateUser = await userServices.findByIdAndUpdate(user._id, {avatar: sendData.Location});

            res.json(updateUser);
        } catch (e) {
            next(e);
        }
    },
    updateAvatar: async (req, res, next) => {
        try {

            await s3Services.updatePublicFile(req.user.avatar, req.files.avatar);

            res.json('Successful');
        } catch (e) {
            next(e);
        }
    },
    deleteAvatar: async (req, res, next) => {
        try {
            await s3Services.deletePublicFile(req.user.avatar)
            await userServices.findByIdAndUpdate(req.user._id, {avatar: ''})

            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    },
}
