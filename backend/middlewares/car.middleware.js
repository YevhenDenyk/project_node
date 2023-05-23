const ApiError = require("../error/apiError");
const {carsService} = require("../services");
const {carValidator, commonValidator} = require("../validators");

module.exports = {
    isCarIdValid: async (req, res, next) => {
        try {
            const validate = commonValidator.idValidator.validate(req.params.carId);

            if (validate.error) {
                throw new ApiError(validate.error.message, 400);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
    isBodyCreateValid: async (req, res, next) => {
        try {

            const validate = carValidator.newCarValidator.validate(req.body);

            if (validate.error) {
                throw new ApiError(validate.error.message, 400);
            }

            req.newCar = validate.value;

            next();
        } catch (e) {
            next(e);
        }
    },
    isCarExist: async (req, res, next) => {
        try {
            const {carId} = req.params;

            const car = await carsService.findById(carId);

            if (!car) {
                throw new ApiError('Car not found', 400);
            }
            req.car = car;

            next();
        } catch (e) {
            next(e);
        }
    },
    isBodyUpdateValid: async (req, res, next) => {
        try {
            const validate = carValidator.newCarValidator.validate(req.body);

            if (validate.error) {
                throw new ApiError(validate.error.message, 400);
            }

            req.newCar = validate.value;

            next();
        } catch (e) {
            next(e);
        }
    },
}
