import React from 'react';
import { Link } from 'react-router-dom';
import Room from './Room';

export default function RoomList({ rooms }) {
    return (
        <div>
            {rooms && rooms.map(room => (
                <Link key={room._id} to={`/chat/${room._id}/${room.name}`}>
                    <Room name={room.name} />
                </Link>
            ))}
        </div>
    )
}
