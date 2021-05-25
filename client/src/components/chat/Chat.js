import React, { useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import Messages from './messages/Messages.js';
import '../../css/chat.css';

let socket;

export default function Chat() {
    const { user, setUser } = useContext(UserContext);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const { roomID, roomName } = useParams();
    const ENDPOINT = 'localhost:5000';
    useEffect(() => {
        socket = io(ENDPOINT);
        const username = user ? user.name : '';
        const userID = user ? user.id : '';
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
            console.log(message);
            socket.emit('send-message', message, roomID, () => setMessage(''));
        }
    };
    return (
        <div className="container">
            <h1>Roomname: {roomName}</h1>
            <h2>{user ? `${user.name}'s Account` : 'Not Login yet'}</h2>
            <Messages messages={messages} currentUser={user ? user.id : ''} />
            <form>
                <input
                    type="text"
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type="submit" onClick={sendMessage} className="btn">
                    SEND
                </button>
            </form>
        </div>
    );
}
