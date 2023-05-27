const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const fileUpload = require('express-fileupload');

const config = require('./configs/config');
const {carRouter, userRouter, authRouter} = require('./routers');
const {cronRunner} = require("./crones");
const swagger = require("./swagger.json");

const app = express();

app.use(express.json());
app.use(fileUpload());
app.use(express.urlencoded({extended: true}));

app.use('/auth', authRouter);
app.use('/cars', carRouter);
app.use('/users', userRouter);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swagger));


app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        Message: err.message || 'Unknown error',
        Status: err.status || 500
    })
})

app.get('/', (req, res) => {
    console.log("welcome")
})


const connect = async () => {
    let dbCon = false
    console.log("Connecting to database ...")
    while (!dbCon) {
        try {
            await mongoose.connect(config.MONGO_URL);
            console.log("Database available")
            dbCon = true
        } catch (e) {
            console.log("Database unavailable, wait 3 second")
            await new Promise(resolve => setTimeout(resolve, 3000))
        }
    }
}

const start = async () => {
    try {
        await connect()

        await app.listen(config.PORT, config.HOST)
        console.log(`Server listen ${config.PORT}`);

        cronRunner();

    } catch (e) {
        console.error(e)
    }
}

start()