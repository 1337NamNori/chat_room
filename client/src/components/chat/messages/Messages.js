import React from 'react';
import STB from 'react-scroll-to-bottom';
import Message from '../message/Message.js';

export default function Messages({ messages, currentUser }) {
    return (
        <STB className="imessage">
            {messages.map((message) => (
                <Message
                    key={message._id}
                    message={message}
                    currentUser={currentUser}
                />
            ))}
        </STB>
    );
}
