const express = require('express');
const app = express();
const cors = require('cors');
const auth = require('../auth.js');
// const { getCurrentuser, userJoin, leaveRoom} = require('./dummyuser');
const socket = require('socket.io');
// const color = require('colors');

// importing functions from dummyuser.js
const { userJoin,
        getCurrentuser,
        leaveRoom
                } = require('./dummyuser');
const { use } = require('../auth.js');

app.use(express.json());
app.use('/api/v1/auth', auth);


const port = 3000;

app.use(cors());
var server = app.listen(
    port,
    console.log(
        `server is running in ${process.env.NODE_ENV} on port ${process.env.port}`.green.bold
    )
);
process.on('unhandleRejection', (err, promise) => {
    console.log(`Error : ${err.message}`.red.bold);
    server.close(() => process.exit(1));
});

// Input Output Main Sockect 
const io = socket(server);

// using io variable we will manage to run live connection
io.on('connection', (socket) => {
    // when new user join the room
    socket.on('joinRoom', ({username , roomname}) => {
        // create user
        const user = userJoin(socket.id, username, roomname);
        console.log('user ID =>', socket.id);
        // join room
        socket.join(user.room);

        // emiting message to welcome the user
        socket.emit('message', {
            userId: user.id,
            userName: user.username,
            text: `Welcome ${user.username}`,
        }); 
        //broadCasting the message
        socket.broadcast.to(user.room).emit('message', {
            userId: user.id,
            userName: user.username,
            text: `${user.username} has joined the chat`,
        });
    });
    // when someone send message
    socket.on("chat",(text) =>  {
        const user = getCurrentuser(socket.id);
        
            io.to(user.room).emit('message', {
                userId: user.id,
                userName: user.username,
                text: text,
            });
        });
    // Disconect , when user leave the room
    socket.io("disconnect", () => {
        // delete user from users & emit has left the chat
        const user = leaveRoom(socket.id);

        if (user) {
            io.to(user.room).emit("message", {
                userId: user.id,
                userName: user.username,
                text: `${user.username} has left the chat`,
            });
        }
    })
})