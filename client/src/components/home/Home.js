import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import RoomList from './RoomList';
import io from 'socket.io-client';

let socket;

export default function Home() {
    const [room, setRoom] = useState('');
    const ENDPOINT = 'localhost:5000';
    useEffect(() => {
        socket = io(ENDPOINT);
        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    }, [ENDPOINT])

    const { user, setUser } = useContext(UserContext);
    const rooms = [
        {
            name: 'room1',
            _id: '1',
        },
        {
            name: 'room2',
            _id: '2',
        },
    ]
    const handleSubmit = e => {
        e.preventDefault();
        socket.emit('create-room', room);
        console.log(room);
        setRoom('');
    }
    const setAsJohn = () => {
        const john = {
            name: 'John',
            email: 'john@email.com',
            password: '123',
            id: '123',
        }
        setUser(john);
    }
    const setAsTom = () => {
        const tom = {
            name: 'Tom',
            email: 'tom@email.com',
            password: '456',
            id: '456',
        }
        setUser(tom);
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col s12 m6">
                    <div className="card blue-grey darken-1">
                        <div className="card-content white-text">
                            <span className="card-title">Welcome {user ? user.name : ''}</span>
                            <div className="row">
                                <form
                                    className="col s12"
                                    onSubmit={handleSubmit}
                                >
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input
                                                placeholder="Enter a Room Name"
                                                id="room-name"
                                                type="text"
                                                className="validate"
                                                value={room}
                                                onChange={e => setRoom(e.target.value)}
                                            />
                                            <label htmlFor="room-name">Room</label>
                                        </div>
                                    </div>
                                    <button className="btn">Create Room</button>
                                </form>
                            </div>
                        </div>
                        <div className="card-action">
                            <a href="#" onClick={setAsJohn}>Set as John</a>
                            <a href="#" onClick={setAsTom}>Set as Tom</a>
                        </div>
                    </div>
                </div>
                <div className="col s12 m6">
                    <RoomList rooms={rooms}></RoomList>
                </div>
            </div>


            <Link to={'/chat'}>
                < button className="btn"> Go to chat</button>
            </Link>
        </div >
    )
}
