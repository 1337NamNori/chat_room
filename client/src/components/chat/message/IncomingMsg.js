import React from 'react';

export default function IncomingMsg({ message }) {
    return (
        <p className="from-them right-align">
            {message.username}: {message.message}
        </p>
    );
}
