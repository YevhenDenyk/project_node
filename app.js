const express = require('express');
const userDb = require('./dataBase/users')

const app = express()

app.use(express.json()); //щоб почав працювати парсинг вхідних даних які ми посилаємо в body
app.use(express.urlencoded({extended: true}))

app.listen(5000, () => {
    console.log('Server listen 5000');
})

app.get('/', (req, res) => {
    console.log('welcome in HEll!')
})

app.get('/users', (req, res) => {
    console.log('users endpoint')

    // res.json({user:'Viktor'})

    // res.end({user:'Viktor'}) //закінчити відповідь чимось, приймає стрінгу застосовується рідко,
    // res.end('ITS OK') //тільки стрічка, так працюватиме

    // res.status(402).json('its OK') //відправити код статус

    // res.sendFile('./erfer') //відправити файл

    res.json(userDb)
})

app.get('/users/:userId', (req, res) => {
    const {userId} = req.params

    res.json(userDb[userId])
})

app.post('/users', (req, res) => {
    const userInfo = req.body;
    console.log(userInfo);

    userDb.push(userInfo);

    res.status(201).json('Created');
})

app.put('/users/:userId', (req, res) => {
    const updateUser = req.body; //витягнути інфу з Боді
    const {userId} = req.params; //витягнути інфу з парамсів

    userDb[userId] = updateUser;

    res.json('Update');
})