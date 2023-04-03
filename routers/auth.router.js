const {authMiddleware, userMiddleware} = require("../middlewares");
const {authController} = require("../controllers");
const router = require('express').Router();

router.post(
    '/login',
    authMiddleware.isValidBody,
    userMiddleware.getUserDynamically('email'),
    authController.loginController
);

router.post(
    '/refresh',
    authMiddleware.checkRefreshToken,
    authController.refreshController
);

module.exports = router
