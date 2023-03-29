const {carsService} = require('../services');

module.exports = {
    getAllCars: async (req, res, next) => {
        try {
            res.json(await carsService.findAll())
        } catch (e) {
            next(e)
        }
    },
    createCar: async (req, res, next) => {
        try {
            const newCar = await carsService.create(req.newCar)

            res.status(201).json(newCar)
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

            const newCar = await carsService.updateOne(req.params.carId, req.newCar)

            res.status(201).json(newCar)

        } catch (e) {
            next(e)
        }
    },
    deleteCar:async (req, res, next) => {
        try {

           await carsService.deleteOne(req.params.carId)

            res.sendStatus(204)

        } catch (e) {
            next(e)
        }
    },
}