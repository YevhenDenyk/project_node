const express = require('express');
require('dotenv').config()
const mongoose = require('mongoose');

const config = require('./configs/config');
const {usersRouter,carsRouter,authRouter} = require('./routers');
const {cronRunner} = require("./crones");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/auth', authRouter);
app.use('/cars', carsRouter);
app.use('/users', usersRouter);

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        error: err.message || 'Unknown error',
        status: err.status || 500
    })
})

app.get('/', (req, res) => {
    console.log("Welcome)")
    res.json('Hello!')
})

app.listen(config.PORT, async () => {
    await mongoose.connect(config.MONGO_URL);
    console.log(`Server listen port ${config.PORT}`)
    cronRunner();
})
