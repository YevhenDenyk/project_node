const {carServices} = require("../services");
const ApiError = require("../errors/ApiError");
const {commonValidator, carValidator} = require("../validators");

module.exports = {
    validateCarId: async (req, res, next) => {
        try {
            const {carId} = req.params;

            const validate = commonValidator.idValidator.validate(carId);

            if (validate.error) {
                throw new ApiError(validate.error.message, 400)
            }

            next()
        } catch (e) {
            next(e)
        }
    },
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
            const validate = carValidator.createCarValidator.validate(req.body);

            if (validate.error) {
                throw new ApiError(validate.error.message, 400)
            }

            next()
        } catch (e) {
            next(e)
        }
    },
    checkDataUpdateCar: (req, res, next) => {
        try {
            const validate = carValidator.updateCarValidator.validate(req.body);

            if (validate.error) {
                throw new ApiError(validate.error.message, 400)
            }

            next()
        } catch (e) {
            next(e)
        }
    },

}
