import React from 'react';

export default function OutgoingMsg({ message }) {
    return (
        <div>
            <div className="row right-align">
                <div className="talk-bubble tri-right border round btm-right-in">
                    <p className="talktext">{message.message}</p>
                </div>
            </div>
        </div>
    );
}
