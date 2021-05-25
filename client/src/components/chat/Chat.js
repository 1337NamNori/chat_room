import React, { useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import io from 'socket.io-client';

let socket;

export default function Chat() {
    const { user, setUser } = useContext(UserContext);
    let { roomID, roomName } = useParams();
    const ENDPOINT = 'localhost:5000';
    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit('join', { roomID, username: user.name, userID: user.id });
    }, [])
    return (
        <div className="container">
            <h1>Room {roomID} {roomName}</h1>
            <h1>Chat {JSON.stringify(user)}</h1>
            <Link to={'/'}>
                <button className="btn">go to home</button>
            </Link>
        </div>
    )
}
