const express = require('express');
require('dotenv').config();

const config = require('./configs/config')
const usersRouter = require('./routers/user.router');


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', usersRouter);

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        err: err.message || "Unknown error",
        status: err.status || 500
    });
});

app.listen(config.PORT, () => {
    console.log(`Server listen port ${config.PORT}`);
});
app.get('/', (req, res) => {
    console.log("Welcome");
    res.json('Welcome');
});
