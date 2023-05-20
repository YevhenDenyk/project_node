const http = require('http');
const socketIO = require('socket.io');
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
const server = http.createServer(app);

app.use(express.json());
app.use(fileUpload());
app.use(express.urlencoded({extended: true}));

const io = socketIO(server, {cors: 'http://localhost:80'});
io.on('connection', (socket) => {
    console.log(socket.id)

    console.log(socket.handshake.auth);
    console.log(socket.handshake.query);

    socket.on('message:send', (messageData) => {
        console.log(messageData.text)

        //SEND ONE TO ONE
        // socket.emit('message:new', messageData.text)

        // SEND EVENT TO ALL EXCEPT EMITTER
        // socket.broadcast.emit('message:new', messageData.text)

        //SEND EVENT TO ALL clients
        io.emit('message:new', messageData.text)

        socket.on('room:join', (roomInfo) => {
            socket.join(roomInfo.roomId); //socket join room
            // socket.leave(roomInfo.roomId); //socket leave room

            // send to all in room except new user
            socket.to(roomInfo.roomId).emit('user:room:join', socket.id)

            //send to all clients

        });
    })

    socket.on('disconnect', ()=>{
        console.log(`Socket ${socket.id} was disconnected`)
    })

})



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

server.listen(config.PORT, async () => {
    await mongoose.connect(config.MONGO_URL);
    console.log(`Server listen ${config.PORT}`);
    cronRunner();
})
