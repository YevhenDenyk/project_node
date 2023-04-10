const {carServices, emailServices} = require("../services");
const {CREATE_CAR} = require("../enums/email-action.enum");

module.exports = {
    getAllCars: async (req, res, next) => {
        try {
            const cars = await carServices.findByParams();

            res.json(cars);
        } catch (e) {
            next(e)
        }
    },

    createCar: async (req, res, next) => {
        try {
            const car = await carServices.create(req.body)

            await emailServices.sendEmail('denyk.yevhen@gmail.com',CREATE_CAR, car)

            res.status(201).json(car);
        } catch (e) {
            next(e)
        }
    },
    getCarById: async (req, res, next) => {
        try {
            res.json(req.car)
        } catch (e) {
            next(e)
        }
    },
    updateCar: async (req, res, next) => {
        try {
            const {body, params} = req

            const car = await carServices.findByIdAndUpdate(params.carId, body)

            res.status(201).json(car);

        } catch (e) {
            next(e)
        }
    },
    deleteCar: async (req, res, next) => {
        try {
            const {carId} = req.params

            await carServices.findByIdAndDelete(carId)

            res.sendStatus(204)

        } catch (e) {
            next(e)
        }
    }
}