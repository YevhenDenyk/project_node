const router = require('express').Router();

const middleware = require('../middlewares/user.middleware')
const controller = require('../controllers/user.controller')

router.get('/', controller.getAllUser)
router.post(
    '/',
    middleware.isBodyValidCreate,
    controller.createUser
)

router.get(
    '/:userID',
    middleware.isParamsValid,
    middleware.checkIsUserExist,
    controller.getUserById
)
router.put(
    '/:userID',
    middleware.isParamsValid,
    middleware.checkIsUserExist,
    middleware.isBodyValidUpdate,
    controller.updateUser
)
router.delete(
    '/:userID',
    middleware.isParamsValid,
    middleware.checkIsUserExist,
    controller.deleteUser
)


module.exports = router