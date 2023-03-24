const {carServices} = require("../services");

module.exports = {
    getAllCars: async (req, res, next) => {
        try {
            const cars = await carServices.findByParams();

            res.json(cars);
        } catch (e) {
            next(e)
        }
    },

    createUser: async (req, res, next) => {
        try {
            const car = await carServices.create(req.body)

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
    updateUser: async (req, res, next) => {
        try {
            const {body, params} = req

            const car = await carServices.findByIdAndUpdate(params.carId, body)

            res.status(201).json(car);

        } catch (e) {
            next(e)
        }
    },
    deleteUser: async (req, res, next) => {
        try {
            const {carId} = req.params

            await carServices.findByIdAndDelete(carId)

            res.sendStatus(204)

        } catch (e) {
            next(e)
        }
    }
}