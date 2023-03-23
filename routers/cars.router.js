const router = require('express').Router();

const {carsController} = require("../controllers");
const {carMiddleware} = require("../middlewares");

router.get(
    '/',
    carsController.getAllCars
);

router.post(
    '/',
    carMiddleware.isBodyCreateValid,
    carsController.createCar
);

router.get(
    '/:carId',
    carMiddleware.isCarExist,
    carsController.getCarById
);

router.put('/:carId',
    carMiddleware.isBodyUpdateValid,
    carMiddleware.isCarExist,
    carsController.updateCar
);

router.delete(
    '/:carId',
    carMiddleware.isCarExist,
    carsController.deleteCar
);

module.exports = router;