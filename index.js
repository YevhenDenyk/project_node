const express = require('express');

const config = require('./configs/user.config')
const userRouter = require('./routers/user.router')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', userRouter);

app.use((err, req, res, next) => {

    res.status(err.status || 500).json({
        message: err.message || "Unknown message",
        status: err.status || 500
    })
})

app.get('/', (req, res) => {
    console.log("welcome")
})
app.listen(config.PORT, () => {
    console.log(`Server listen ${config.PORT}`)
})
