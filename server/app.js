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
const Room = require('./models/Room.js');
const Message = require('./models/Message.js');

io.on('connection', (socket) => {
    console.log(socket.id + ' connected');

    Room.find({})
        .then((rooms) => {
            io.emit('rooms-loaded', rooms);
        })
        .catch((err) => console.log(err));

    socket.on('create-room', (name) => {
        console.log(name + ' is created');
        const room = new Room({ name });
        room.save()
            .then((room) => {
                io.emit('room-created', room);
            })
            .catch((err) => console.log(err));
    });

    socket.on('join', ({ roomID, userID, username }) => {
        const { error, user } = addUser(socket.id, roomID, userID, username);
        if (error) {
            console.log(error);
        } else {
            socket.join(roomID);
            console.log(user.username + ' joined');
        }
        Message.find({ roomID })
            .then((messages) => {
                io.emit('messages-loaded', messages);
            })
            .catch((err) => console.log(err));
    });

    socket.on('send-message', (message, roomID, callback) => {
        const user = getUser(socket.id);
        const receivedMessage = {
            username: user.username,
            userID: user.userID,
            roomID,
            message,
        };
        const newMessage = new Message(receivedMessage);
        newMessage
            .save()
            .then((message) => {
                io.to(roomID).emit('receive-message', message);
            })
            .catch((err) => console.log(err));
        callback();
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
    });
});

http.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
