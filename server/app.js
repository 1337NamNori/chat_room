const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Express Middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
        optionsSuccessStatus: 200,
    }),
);

// Create Server
const http = require('http').createServer(app);

// Socket.io define
const io = require('socket.io')(http);

// Port: 5000
const PORT = process.env.PORT || 5000;

// Routes
const authRouter = require('./routes/auth.js');

app.use('/', authRouter);

// Database
const db = require('./config/db/index.js');
db.connect();

// Helper Functions
const { addUser, getUser, removeUser } = require('./helpers.js');

// Import Models
const Room = require('./models/Room.js');
const Message = require('./models/Message.js');

// Socket.io Logic
io.on('connection', (socket) => {
    console.log(socket.id + ' connected');

    Room.find({})
        .then((rooms) => {
            io.emit('rooms-loaded', rooms);
        })
        .catch((err) => console.log(err));

    socket.on('create-room', (name) => {
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
        }
        Message.find({ roomID })
            .then((messages) => {
                io.emit('messages-loaded', messages);
            })
            .catch((err) => console.log(err));
    });

    socket.on('send-message', (message, roomID, callback) => {
        const user = getUser(socket.id);
        if (!user) callback();
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

// Start server
http.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
