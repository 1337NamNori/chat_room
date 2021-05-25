import React from 'react';

export default function Room({ name }) {
    return (
        <div>
            <div className="card horizontal">
                <div className="card-stacked">
                    <div className="card-content">
                        <h4>{name}</h4>
                    </div>
                </div>
            </div>
        </div>
    );
}
