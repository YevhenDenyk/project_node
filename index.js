const express = require('express');
const {fileService} = require("./services");

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(5000, () => {
    console.log('Server listen port 5000')
})
app.get('/', (req, res) => {
    console.log("Welcome")
    res.json('Welcome')
})

app.get('/users', async (req, res) => {
    const users = await fileService.readFile()
    res.json(users)
})

app.post('/users', async (req, res) => {
    const user = req.body;

    if (user.age < 0 || user.age > 110 || typeof user.age !== "number") {
        return res.status(400).json('User age not valid')
    }
    if (user.name.length < 3 || typeof user.name !== "string") {
        return res.status(400).json('User name not valid')
    }

    const users = await fileService.readFile();

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
})

app.get('/users/:userID', async (req, res) => {
    const {userID} = req.params;

    const users = await fileService.readFile()
    const user = users.find(user => user.id === +userID)

    if (!user) {
        return res.status(400).json(`User ${userID} not found`)
    }

    res.json(user)
})

app.put('/users/:userID', async (req, res) => {
    const {userID} = req.params;
    const updateUser = req.body;

    if (updateUser.age < 0 || updateUser.age > 110 || typeof updateUser.age !== "number") {
        return res.status(400).json('User age not valid')
    }
    if (updateUser.name.length < 3 || typeof updateUser.name !== "string") {
        return res.status(400).json('User name not valid')
    }

    const users = await fileService.readFile()
    const index = users.findIndex(user => user.id === +userID)

    if (index === -1) {
        return res.status(400).json(`User ${userID} not found`)
    }

    Object.assign(users[index], updateUser)
    await fileService.writeFile(users)

    res.status(201).json('User updated')
})

app.delete('/users/:userID', async (req, res) => {
    const {userID} = req.params;

    const users = await fileService.readFile()
    const index = users.findIndex(user => user.id === +userID)

    if (index === -1) {
        return res.status(400).json(`User ${userID} not found`)
    }

    users.splice(index,1)

    await fileService.writeFile(users)

    res.sendStatus(204)
})