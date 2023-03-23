const router = require('express').Router();

const {usersController} = require('../controllers');
const {userMiddleware} = require('../middlewares');

router.get(
    '/',
    usersController.getAllUsers
);

router.post(
    '/',
    userMiddleware.isBodyCreateValid,
    userMiddleware.checkIsEmailUnique,
    userMiddleware.userNormalizer,
    usersController.createUser
);

router.get(
    '/:userID',
    // userMiddleware.isParamsValid,
    userMiddleware.isUserExist,
    usersController.getUserById
);

router.put('/:userID',
    // userMiddleware.isParamsValid,
    userMiddleware.isBodyUpdateValid,
    userMiddleware.userNormalizer,
    userMiddleware.isUserExist,
    usersController.updateUser
);

router.delete(
    '/:userID',
    // userMiddleware.isParamsValid,
    userMiddleware.isUserExist,
    usersController.deleteUser
);


module.exports = router