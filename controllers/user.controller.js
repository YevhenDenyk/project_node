const dataUsers = require("../dataBase/data");

module.exports = {
    getAllUsers: (req, res, next) => {
        try {
            res.json(dataUsers)
        } catch (e) {
            next(e)
        }
    },
    createUser: (req, res, next) => {
        try {
            const user = req.body;

            if (user.name && user.age) {
                dataUsers.push(user);
                res.status(201).json("create");
            } else {
                res.json("bed request")
            }
        } catch (e) {
            next(e)
        }
    },
    getUserById: (req, res, next) => {
        try {
            const user = req.user

                res.json(user)

        } catch (e) {
            next(e)
        }
    },
    updateUser: (req, res, next) => {
        try {
            const {userId} = req.params;
            const updateUser = req.body;

                if (updateUser.name && updateUser.age) {

                    dataUsers[userId] = updateUser;
                    res.json('update')

                } else {
                    res.json("bed request")
                }

        } catch (e) {
            next(e)
        }
    },
    deleteUser: (req, res, next) => {
        try {
            const {userId} = req.params;

                dataUsers.splice(userId, 1)
                res.json('delete')

        } catch (e) {
            next(e)
        }
    }

}
