const {fileService} = require("../services");

module.exports = {
    getAllUser: async (req, res, next) => {
        try {
            const users = await fileService.readFile()
            res.json(users)

        }catch (e) {
            next(e)
        }
    },
    createUser: async (req, res, next) => {
        try {
            const user = req.body;
            const users = await fileService.readFile()

            let indexID = users[0].id;
            for (const user of users) {
                if (user.id > indexID) {
                    indexID = user.id
                }
            }

            const newUser = {id: indexID + 1, name: user.name, age: user.age}
            users.push(newUser);

            await fileService.writeFile(users);

            res.status(201).json(newUser)
        }catch (e) {
            next(e)
        }
    },
    getUserById:async (req, res, next) => {
        try {
            const {user} = req

            res.json(user)
        } catch (e) {
            next(e)
        }
    },
    updateUser:async (req, res, next) => {
        try {
            const {user, users, body} = req

            const index = users.findIndex(u => u.id === user.id)

            Object.assign(users[index], body)

            await fileService.writeFile(users)

            res.status(201).json('User updated')
        } catch (e) {
            next(e)
        }
    },
    deleteUser:async (req, res, next) => {
        try {
            const {user, users} = req

            const index = users.findIndex(u => u.id === user.id)

            users.splice(index,1)

            await fileService.writeFile(users)

            res.sendStatus(204)
        } catch (e) {
            next(e)
        }
    }
}
