const router = require('express').Router();

const {carsController} = require("../controllers");
const {carMiddleware} = require("../middlewares");

router.get(
    '/',
    carsController.getAllCars
);

router.post(
    '/',
    carMiddleware.isCarIdValid,
    carMiddleware.isBodyCreateValid,
    carsController.createCar
);

router.get(
    '/:carId',
    carMiddleware.isCarIdValid,
    carMiddleware.isCarExist,
    carsController.getCarById
);

router.put('/:carId',
    carMiddleware.isCarIdValid,
    carMiddleware.isBodyUpdateValid,
    carMiddleware.isCarExist,
    carsController.updateCar
);

router.delete(
    '/:carId',
    carMiddleware.isCarIdValid,
    carMiddleware.isCarExist,
    carsController.deleteCar
);

module.exports = router;