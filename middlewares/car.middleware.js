const ApiError = require("../error/apiError");
const {carsService} = require("../services");

module.exports = {
    isBodyCreateValid: async (req, res, next) => {
        try {
            const {model, year, price} = req.body

            if (!model || typeof model !== "string" || model.length < 3 || model.length > 15) {
                throw new ApiError('Model invalid', 400)
            }
            if (!year || typeof year !== "number" || year < 1950 || year > new Date().getFullYear()) {
                throw new ApiError('Year invalid', 400)
            }
            if (!price || typeof price !== "number" || price < 1 || price > 10000000) {
                throw new ApiError('Price invalid', 400)
            }

            next()
        } catch (e) {
            next(e)
        }
    },
    isCarExist: async (req, res, next) => {
        try {
            const {carId} = req.params

            const car = await carsService.findById(carId)

            if (!car) {
                throw new ApiError('Car not found', 400)
            }
            req.car = car

            next()
        } catch (e) {
            next(e)
        }
    },
    isBodyUpdateValid: async (req, res, next) => {
        try {
            const {model, year, price} = req.body

            if (model && (!model || typeof model !== "string" || model.length < 3 || model.length > 15)) {
                throw new ApiError('Model invalid', 400)
            }
            if (year && (!year || typeof year !== "number" || year < 1950 || year > new Date().getFullYear())) {
                throw new ApiError('Year invalid', 400)
            }
            if (price && (!price || typeof price !== "number" || price < 1 || price > 10000000)) {
                throw new ApiError('Price invalid', 400)
            }

            next()
        } catch (e) {
            next(e)
        }
    },
}
