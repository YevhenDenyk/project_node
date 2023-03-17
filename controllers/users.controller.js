const {fileService} = require('../services/index');
const {json} = require("express");

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await fileService.readerFile()
            res.json(users)
        } catch (e) {
            next(e)
        }
    },
    createUser: async (req, res, next) => {
        try {
            const {age, name} = req.body
            const users = await fileService.readerFile()

            let maxID = users[0].id
            for (const user of users) {
                if (user.id > maxID) {
                    maxID = user.id
                }
            }

            const newUser = {id: maxID + 1, name, age}

            users.push(newUser)

            await fileService.writerFile(users);
            res.status(201).json(newUser)

        } catch (e) {
            next(e)
        }
    },
    getUserById: async (req, res, next) => {
        try {
            res.json(req.user)
        } catch (e) {
            next(e)
        }
    },
    updateUser: async (req, res, next) => {
        try {
            const {user, users, body} = req

            const index = users.findIndex(u => u.id === user.id);
            Object.assign(users[index], body)
            // users[index] = {...users[index], ...body}

            await fileService.writerFile(users)

            res.status(201).json('User updated')
        } catch (e) {
            next(e)
        }
    },
    deleteUser: async (req, res, next) => {
        try {
            const {user, users} = req

            const index = users.findIndex(u => u.id === user.id);

            users.splice(index,1)
            await fileService.writerFile(users)

            res.sendStatus(204)

        } catch (e) {
            next(e)
        }
    },
}