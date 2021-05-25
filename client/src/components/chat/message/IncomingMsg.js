import React from 'react';

export default function IncomingMsg({ message }) {
    // console.log(message)
    return (
        <div>
            <div className="row left-align">
                <div className="talk-bubble tri-right border round btm-left-in">
                    <p className="talktext">
                        {message.username}: {message.message}
                    </p>
                </div>
            </div>
        </div>
    );
}
