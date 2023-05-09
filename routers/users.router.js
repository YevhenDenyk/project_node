const router = require('express').Router()

const {userController} = require('../controllers')
const {userMiddleware, authMiddleware, fileMiddleware} = require('../middlewares')

router.get(
    '/',
    userController.getAllUsers
);
router.post(
    '/',
    userMiddleware.dataNormalizer,
    userMiddleware.checkDataCreateUser,
    userMiddleware.checkIsEmailExist,
    userController.createUser
);

router.get(
    '/:userId',
    userMiddleware.checkIsIdValid,
    authMiddleware.checkAccessToken,
    userMiddleware.getUserDynamically("userId", "params", "_id"),
    // userMiddleware.checkUserWithCar,
    userController.getUserById
);
router.put(
    '/:userId',
    userMiddleware.checkIsIdValid,
    userMiddleware.dataNormalizer,
    userMiddleware.checkDataUserUpdated,
    authMiddleware.checkAccessToken,
    userMiddleware.getUserDynamically("userId", "params", "_id"),
    userMiddleware.checkIsEmailExist,
    userController.updateUser
);
router.delete(
    '/:userId',
    userMiddleware.checkIsIdValid,
    authMiddleware.checkAccessToken,
    userMiddleware.getUserDynamically("userId", "params", "_id"),
    userController.deleteUser
);

router.patch(
    '/:userId/avatar',
    fileMiddleware.checkUploadImage,
    userMiddleware.checkIsIdValid,
    // authMiddleware.checkAccessToken,
    userMiddleware.getUserDynamically("userId", "params", "_id"),
    userController.avatarUser
)

module.exports = router
