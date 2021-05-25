const express = require('express');
const mongoose = require('mongoose');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const PORT = process.env.PORT || 5000;
const mongoURL = `mongodb+srv://namnori:chatroom123@cluster0.gwx0l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose
    .connect(mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Database is connected'))
    .catch((err) => console.log(err));

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
            socket.join(roomID);
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
