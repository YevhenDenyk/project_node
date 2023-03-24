const {carServices} = require("../services");
const ApiError = require("../errors/ApiError");

module.exports = {
    checkIsCarExistAndReturn: async (req, res, next) => {
        try {
            const {carId} = req.params;

            const car = await carServices.findOne({_id: carId})

            if (!car) {
                throw new ApiError('Car not found', 404)
            }

            req.car = car;
            next()

        } catch (e) {
            next(e)
        }
    },
    checkDataCreateCar: (req, res, next) => {
        try {
            const {model, price, year} = req.body;

            if (!model || model.length < 2 || typeof model !== "string") {
                throw new ApiError('Bad request, model incorrect', 400)
            }
            if (!price || price < 0 || price > 9999999 || typeof price !== "number") {
                throw new ApiError('Bad request, price incorrect', 400)
            }
            if (!year || year < 1990 || year > new Date().getFullYear() || typeof year !== "number") {
                throw new ApiError('Bad request, year incorrect', 400)
            }

            next()
        } catch (e) {
            next(e)
        }
    },
    checkDataUpdateCar: (req, res, next) => {
        try {
            const {model, price, year} = req.body;

            if (model && (!model || model.length < 2 || typeof model !== "string")) {
                throw new ApiError('Bad request, model incorrect', 400)
            }
            if (price && (!price || price < 0 || price > 9999999 || typeof price !== "number")) {
                throw new ApiError('Bad request, price incorrect', 400)
            }
            if (year && (!year || year < 1990 || year > new Date().getFullYear() || typeof year !== "number")) {
                throw new ApiError('Bad request, year incorrect', 400)
            }

            next()
        } catch (e) {
            next(e)
        }
    },
    // dataNormalizer: (req, res, next) => {
    //     try {
    //         const {email, name} = req.body
    //
    //         if (email) {
    //             req.body.email = email.toLowerCase()
    //         }
    //         if (name) {
    //             req.body.name = userNormalizer.name(name)
    //         }
    //
    //         next()
    //     } catch (e) {
    //         next(e)
    //     }
    // },
}
