import React from 'react';

export default function Input({ message, setMessage, sendMessage }) {
    return (
        <div>
            <form>
                <input
                    type="text"
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type="submit" onClick={sendMessage} className="btn">
                    SEND
                </button>
            </form>
        </div>
    );
}
