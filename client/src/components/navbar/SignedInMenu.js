import React from 'react';

export default function SignedInMenu({ logout }) {
    return (
        <div>
            <li onClick={logout}>
                <a href="#">Logout</a>
            </li>
        </div>
    );
}
