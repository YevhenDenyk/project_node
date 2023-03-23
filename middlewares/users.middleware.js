const ApiError = require("../error/apiError");
const {userService} = require("../services");
const {userNormalizer} = require("../helper");

module.exports = {
    // isParamsValid: async (req, res, next) => {
    //     try {
    //         const {userID} = req.params
    //
    //         if (userID < 0 || typeof +userID !== "number") {
    //             throw new ApiError('User ID in params no valid', 400)
    //         }
    //
    //         next()
    //     } catch (e) {
    //         next(e)
    //     }
    // },
    isUserExist: async (req, res, next) => {
        try {
            const {userID} = req.params;

            const user = await userService.findOne({_id: userID})

            if (!user) {
                throw new ApiError(`User with id: ${userID} not found`, 404);
            }

            req.user = user;
            next();

        } catch (e) {
            next(e);
        }
    },
    isBodyCreateValid: async (req, res, next) => {
        try {
            const {age, name, email} = req.body

            if (age < 0 || age > 120 || typeof age !== "number") {
                throw new ApiError('Age no valid', 400)
            }
            if (name.length < 3 || typeof name !== "string") {
                throw new ApiError('Name no valid', 400)
            }
            if (!email || !email.includes('@')) {
                throw new ApiError('Email no valid', 400)
            }

            next()
        } catch (e) {
            next(e)
        }
    },
    userNormalizer: async (req, res, next) => {
        try {
           let { name, email} = req.body

           if(name) {
               req.body.name = userNormalizator.name(name)
           }
           if (email) {
               req.body.email = email.toLowerCase()
           }

            next()
        } catch (e) {
            next(e)
        }
    },
    isBodyUpdateValid: async (req, res, next) => {
        try {
            const {age, name, email} = req.body

            if (age && (age < 0 || age > 120 || typeof age !== "number")) {
                throw new ApiError('Age no valid', 400)
            }
            if (name && (name.length < 3 || typeof name !== "string")) {
                throw new ApiError('Name no valid', 400)
            }
            if (email &&  !email.includes('@')) {
                throw new ApiError('Email no valid', 400)
            }

            next()
        } catch (e) {
            next(e)
        }
    },
    checkIsEmailUnique: async (req, res, next) => {
        try {
            const {email} = req.body

            if (!email) {
                throw new ApiError(`Email not present`, 400);
            }

            const user = await userService.findOne({email: email});

            if (user) {
                throw new ApiError(`User with this email already exists`, 409);
            }

            next()
        } catch (e) {
            next(e)
        }

    },
}