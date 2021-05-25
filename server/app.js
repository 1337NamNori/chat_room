const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const PORT = process.env.PORT || 5000;

const { addUser, getUser, removeUser } = require('./helpers.js');

io.on('connection', (socket) => {
    console.log(socket.id + ' connected');
    socket.on('create-room', (room) => {
        console.log(room + ' is created');
    });

    socket.on('join', ({ roomID, userID, username }) => {
        const { error, user } = addUser(socket.id, roomID, userID, username);
        if (error) {
            console.log(error);
        } else {
            console.log(user.username + ' joined');
        }
    });

    socket.on('send-message', (message, roomID, callback) => {
        const user = getUser(socket.id);
        const receivedMessage = {
            name: user.username,
            userID: user.userID,
            roomID,
            message,
        };
        console.log(receivedMessage);
        io.to(roomID).emit('receive-message', receivedMessage);
        callback();
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
    });
});

http.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
