const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const PORT = process.env.PORT || 5000;

const { addUser } = require('./helpers.js');

io.on('connection', (socket) => {
    console.log(socket.id + ' connected');
    socket.on('create-room', room => {
        console.log(room + ' is created');
    })

    socket.on('join', ({ roomID, userID, username }) => {
        const { error, user } = addUser(socket.id, roomID, userID, username);
        if (error) {
            console.log(error);
        } else {
            console.log(user.username + ' joined');
        }
    })
})


http.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})
