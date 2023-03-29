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

module.exports = router