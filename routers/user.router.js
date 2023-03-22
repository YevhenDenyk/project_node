const router = require('express').Router();

const controller = require('../controllers/users.controller');
const middleware = require('../middlewares/users.middleware');

router.get(
    '/',
    controller.getAllUsers
);

router.post(
    '/',
    middleware.isBodyCreateValid,
    middleware.checkIsEmailUnique,
    middleware.userNormalizator,
    controller.createUser
);

router.get(
    '/:userID',
    middleware.isParamsValid,
    middleware.isUserExist,
    controller.getUserById
);

router.put('/:userID',
    middleware.isParamsValid,
    middleware.isBodyUpdateValid,
    middleware.userNormalizator,
    middleware.isUserExist,
    controller.updateUser
);

router.delete(
    '/:userID',
    middleware.isParamsValid,
    middleware.isUserExist,
    controller.deleteUser
);


module.exports = router