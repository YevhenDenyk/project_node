const userDb = require("../dataBase/users");
module.exports = {
    getAllUsers: (req, res, next) => {
        try {
            res.json(userDb)
        } catch (e) {
            next(e)
        }
    },
    getUserById: (req, res, next) => {
        try {
            // const {userId} = req.params // ми більше не робимо дотатковий запит в Базу даних
            const user = req.user // просто витягуємо інфу із req в який ми її закинули в мідлварі

            res.json(user)
        } catch (e) {
            next(e)
        }
    },
    createUser: (req, res, next) => {
        try {
            const userInfo = req.body;

            userDb.push(userInfo);

            res.status(201).json('Created');
        } catch (e) {
            next(e)
        }
    },
    updateUser: (req, res, next) => {
        try {
            const updateUser = req.body;
            const {userId} = req.params;

            userDb[userId] = updateUser;

            res.json('Update');
        } catch (e) {
            next(e)
        }
    }
}