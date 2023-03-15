const express = require('express');
require('dotenv').config();

const config = require('./configs/config');
const router = require('./routers/users.router');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', router)

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        Message: err.message || 'Unknown error',
        Status: err.status || 500
    })
})

app.listen(config.PORT, () => {
    console.log(`Server listen ${config.PORT}`)
})

app.get('/', (req, res) => {
    console.log("welcome")
})

