const router = require('express').Router()

const controller = require('../controllers/user.controller')
const middleware = require('../middlewares/user.middleware')

router.get('/', controller.getAllUsers)
router.post('/', middleware.checkDataCreateUser, controller.createUser)

router.get('/:userId', middleware.checkIsUserExist, controller.getUserById)
router.put('/:userId', middleware.checkIsUserExist, middleware.checkDataUserUpdated, controller.updateUser)
router.delete('/:userId', middleware.checkIsUserExist, controller.deleteUser)


module.exports = router
