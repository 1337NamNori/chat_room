import React from 'react';
import IncomingMsg from './IncomingMsg.js';
import OutgoingMsg from './OutgoingMsg.js';

export default function Message({ message, currentUser }) {
    console.log(message.userID);
    console.log(currentUser);
    const isCurrentUser = currentUser === message.userID;
    console.log(isCurrentUser);
    return (
        <div>
            {!isCurrentUser ? (
                <IncomingMsg message={message} />
            ) : (
                <OutgoingMsg message={message} />
            )}
        </div>
    );
}
