const {fileServices} = require("../services");

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await fileServices.reader();

            res.json(users);
        }catch (e) {
            next (e)
        }
    },

    createUser: async (req, res, next) => {
        try {
            const user = req.body

            const users = await fileServices.reader()

            let maxID = users[0].id
            for (const findID of users) {
                if (findID.id > maxID) {
                    maxID = findID.id
                }
            }

            const newUser = {id: maxID + 1, name: user.name, age: user.age}
            users.push(newUser)

            await fileServices.writer(users)

            res.status(201).json(newUser);
        }catch (e) {
            next (e)
        }
    },
    getUserById: async (req, res, next) => {
        try {
            const user = req.user

            res.json(user)
        }catch (e) {
            next (e)
        }
    },
    updateUser: async (req, res, next) => {
        try {
            const {user,users, body} = req

            const index = users.findIndex((u) => u.id === user.id);

            users[index] = {...users[index], ...body};

            await fileServices.writer(users);

            res.status(201).json(users[index]);

        }catch (e) {
            next (e)
        }
    },
    deleteUser:async (req, res, next) => {
        try {
            const {user,users} = req

            const index = users.findIndex(u => u.id === user.id);
            users.splice(index, 1)

            await fileServices.writer(users)

            res.sendStatus(204)

        }catch (e) {
            next (e)
        }
    }
}