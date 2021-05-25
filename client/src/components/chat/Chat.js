import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import io from 'socket.io-client';

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
            console.log(receivedMessage);
            setMessages([...messages, receivedMessage]);
        });
    }, [messages]);
    const sendMessage = (e) => {
        e.preventDefault();
        if (message) {
            console.log(message);
            socket.emit('send-message', message, roomID, () => setMessage(''));
        }
    };
    return (
        <div className="container">
            <h1>
                Room {roomID} {roomName}
            </h1>
            <h1>Chat {JSON.stringify(user)}</h1>
            <pre>{JSON.stringify(messages, null, '\t')} </pre>
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
