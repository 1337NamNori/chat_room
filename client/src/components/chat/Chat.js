import React, { useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useParams, Redirect } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import Messages from './messages/Messages.js';
import Input from './input/Input.js';
import '../../css/chat.css';

let socket;

export default function Chat() {
    const { user, setUser } = useContext(UserContext);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const { roomID, roomName } = useParams();
    const ENDPOINT = 'http://localhost:5000/';
    useEffect(() => {
        socket = io(ENDPOINT);
        const username = user ? user.username : '';
        const userID = user ? user._id : '';
        if (username && userID)
            socket.emit('join', { roomID, username, userID });
    }, []);

    useEffect(() => {
        socket.on('receive-message', (receivedMessage) => {
            setMessages([...messages, receivedMessage]);
        });
    }, [messages]);

    useEffect(() => {
        socket.on('messages-loaded', (messages) => {
            setMessages(messages);
        });
    }, []);

    const sendMessage = (e) => {
        e.preventDefault();
        if (message) {
            socket.emit('send-message', message, roomID, () => setMessage(''));
        }
    };
    if (!user) {
        return <Redirect to="/login" />;
    }
    return (
        <div className="container">
            <h2>Roomname: {roomName}</h2>
            <h4>{user ? `${user.username}'s Account` : 'Not Login yet'}</h4>
            <Messages messages={messages} currentUser={user ? user._id : ''} />
            <Input
                message={message}
                setMessage={setMessage}
                sendMessage={sendMessage}
            />
        </div>
    );
}
