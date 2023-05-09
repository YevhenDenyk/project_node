const router = require('express').Router();

const {usersController} = require('../controllers');
const {userMiddleware,authMiddleware,fileMiddleware} = require('../middlewares');

router.get(
    '/',
    usersController.getAllUsers
);

router.post(
    '/',
    userMiddleware.isBodyCreateValid,
    userMiddleware.userNormalizer,
    userMiddleware.checkIsEmailUnique,
    usersController.createUser
);

router.get(
    '/:userID',
    userMiddleware.isUserIdValid,
    authMiddleware.checkAccessToken,
    userMiddleware.getUserDynamically('userID','params', '_id'),
    usersController.getUserById
);

router.put('/:userID',
    userMiddleware.isUserIdValid,
    userMiddleware.isBodyUpdateValid,
    userMiddleware.userNormalizer,
    authMiddleware.checkAccessToken,
    userMiddleware.getUserDynamically('userID','params', '_id'),
    usersController.updateUser
);

router.delete(
    '/:userID',
    userMiddleware.isUserIdValid,
    authMiddleware.checkAccessToken,
    userMiddleware.getUserDynamically('userID','params', '_id'),
    usersController.deleteUser
);

router.patch(
    '/:userID/avatar',
    fileMiddleware.checkUploadImage,
    userMiddleware.isUserIdValid,
    // authMiddleware.checkAccessToken,
    userMiddleware.getUserDynamically('userID','params', '_id'),
    usersController.uploadAvatar
);


module.exports = router