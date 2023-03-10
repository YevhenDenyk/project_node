const express = require('express');
const dataUsers = require('./dataBase/data')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(5000, () => {
    console.log('Server listen 5000')
})

app.get('/', (req, res) => {
    console.log("welcome")
})

app.get('/users', (req, res) => {
    res.json(dataUsers)
})

app.get('/users/:userId', (req, res) => {
    const {userId} = req.params
    const length = dataUsers.length

    if (0 <= +userId && +userId <= length-1) {
        res.json(dataUsers[userId])
    } else {
        res.json('User not found')
    }

})

app.post('/users', (req, res) => {
    const user = req.body;
    console.log(user);

    if (user.name && user.age) {
        dataUsers.push(user);
        res.status(201).json("create");
    } else {
        res.json("bed request")
    }
})

app.put('/users/:userId', (req, res) => {
    const {userId} = req.params;
    const updateUser = req.body;
    const length = dataUsers.length

    if (0 <= +userId && +userId <= length-1) {

        if (updateUser.name && updateUser.age) {

            dataUsers[userId] = updateUser;
            res.json('update')

        } else {
            res.json("bed request")
        }
    } else {
        res.json('User not found')
    }
})

app.delete('/users/:userId', (req, res) => {
    const {userId} = req.params;
    const length = dataUsers.length

    if (0 <= +userId && +userId <= length-1) {
        dataUsers.splice(userId, 1)
        res.json('delete')
    } else {
        res.json('User not found')
    }
})