const router = require('express').Router();

const controller = require("../controlers/user.controler");
const middleware = require("../middlewares/user.middlewares");

router.get('/', controller.getAllUsers)

router.post('/', controller.createUser)

router.get('/:userId', middleware.checkIsUserExist, controller.getUserById)

router.put('/:userId', middleware.checkIsUserExist, controller.updateUser)

module.exports = router