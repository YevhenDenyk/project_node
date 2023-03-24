const router = require('express').Router()

const {userController} = require('../controllers')
const {userMiddleware} = require('../middlewares')

router.get(
    '/',
    userController.getAllUsers
);
router.post(
    '/',
    userMiddleware.checkDataCreateUser,
    userMiddleware.dataNormalizer,
    userMiddleware.checkIsEmailExist,
    userController.createUser
);

router.get(
    '/:userId',
    userMiddleware.checkIsUserExistAndReturn,
    userController.getUserById
);
router.put(
    '/:userId',
    userMiddleware.checkIsUserExist,
    userMiddleware.checkDataUserUpdated,
    userMiddleware.dataNormalizer,
    userMiddleware.checkIsEmailExist,
    userController.updateUser
);
router.delete(
    '/:userId',
    userMiddleware.checkIsUserExist,
    userController.deleteUser
);

module.exports = router
