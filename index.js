const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');

const config = require('./configs/config');
const {carRouter, userRouter, authRouter} = require('./routers');
const {cronRunner} = require("./crones");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/auth', authRouter);
app.use('/cars', carRouter);
app.use('/users', userRouter);


app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        Message: err.message || 'Unknown error',
        Status: err.status || 500
    })
})

app.get('/', (req, res) => {
    console.log("welcome")
})

app.listen(config.PORT, async () => {
    await mongoose.connect(config.MONGO_URL);
    console.log(`Server listen ${config.PORT}`);
    cronRunner();
})
