const router = require('express').Router();

const {carController} = require('../controllers')
const {carMiddleware} = require('../middlewares')

router.get(
    '/',
    carController.getAllCars
);
router.post(
    '/',
    carMiddleware.checkDataCreateCar,
    carController.createUser
);

router.get(
    '/:carId',
    carMiddleware.validateCarId,
    carMiddleware.checkIsCarExistAndReturn,
    carController.getCarById
);
router.put(
    '/:carId',
    carMiddleware.validateCarId,
    carMiddleware.checkIsCarExistAndReturn,
    carMiddleware.checkDataUpdateCar,
    carController.updateUser
);
router.delete(
    '/:carId',
    carMiddleware.validateCarId,
    carMiddleware.checkIsCarExistAndReturn,
    carController.deleteUser
);

module.exports = router