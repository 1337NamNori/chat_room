import React from 'react';
import IncomingMsg from './IncomingMsg.js';
import OutgoingMsg from './OutgoingMsg.js';

export default function Message({ message, currentUser }) {
    const isCurrentUser = currentUser === message.userID;
    return (
        <div className="imessage-item">
            {!isCurrentUser ? (
                <IncomingMsg message={message} />
            ) : (
                <OutgoingMsg message={message} />
            )}
        </div>
    );
}
