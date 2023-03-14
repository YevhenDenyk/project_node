const router = require('express').Router();

const controller = require('../controllers/user.controller');
const middleware = require('../middlewares/user.middleware');

router.get('/', controller.getAllUsers);
router.post('/',controller.createUser);
router.get('/:userId',middleware.checkIsUserExist, controller.getUserById);
router.put('/:userId',middleware.checkIsUserExist, controller.updateUser);
router.delete('/:userId',middleware.checkIsUserExist, controller.deleteUser);

module.exports = router
