import React from 'react';

export default function OutgoingMsg({ message }) {
    return <p className="from-me right-align">{message.message}</p>;
}
