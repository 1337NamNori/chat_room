import React from 'react';
import Message from '../message/Message.js';

export default function Messages({ messages, currentUser }) {
    // console.log(messages, currentUser)
    return (
        <div>
            {messages.map((message) => (
                <Message
                    key={message._id}
                    message={message}
                    currentUser={currentUser}
                />
            ))}
        </div>
    );
}
