const router = require('express').Router();

const {authController} = require('../controllers');
const {authMiddleware, userMiddleware} = require('../middlewares');


router.post(
    '/login',
    authMiddleware.isBodyValid,
    userMiddleware.getUserDynamically('email'),
    authController.login
);
router.post(
    '/refresh',
    authMiddleware.checkRefreshToken,
    authController.refresh
);

router.post(
    '/password/forgot',
    userMiddleware.getUserDynamically('email'),
    authController.forgotPassword
);
router.put(
    '/password/forgot',
    authMiddleware.isPasswordValid,
    authMiddleware.checkActionToken,
    authController.setPasswordAfterForgot
);

module.exports = router