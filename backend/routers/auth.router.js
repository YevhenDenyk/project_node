const {authMiddleware, userMiddleware} = require("../middlewares");
const {authController} = require("../controllers");
const router = require('express').Router();
const {actionTokenTypeEnums} = require("../enums");

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

router.post(
    '/logout',
    authMiddleware.checkAccessToken,
    authController.logoutController
);

router.post(
    '/password/forgot',
    authMiddleware.isValidEmail,
    userMiddleware.getUserDynamically('email'),
    authController.forgotPasswordController
);

router.put(
    '/password/forgot',
    authMiddleware.isValidPassword,
    authMiddleware.checkActionToken(actionTokenTypeEnums.FORGOT_PASSWORD),
    authMiddleware.checkOldPassword,
    authController.newForgotPasswordController
);

module.exports = router
