const express = require('express');
require('dotenv').config()

const userRouter = require('./routers/user.router')
const config = require('./configs/config');

const app = express()

app.use(express.json()); //щоб почав працювати парсинг вхідних даних які ми посилаємо в body
app.use(express.urlencoded({extended: true}))

app.use('/users', userRouter)

app.use((err, req, res, next)=>{

    res.status(err.status || 500).json({
        message: err.message || 'Unknown massage',
        status: err.status || 500
    })
})

app.get('/', (req, res) => {
    console.log('welcome in HEll!')
})

app.listen(config.PORT, () => {
    console.log(`Server listen ${config.PORT}`);
})
