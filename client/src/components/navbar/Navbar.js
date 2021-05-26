import React from 'react';

export default function Navbar() {
    return (
        <div>
            <nav>
                <div className="nav-wrapper container">
                    <a href="/" className="brand-logo">
                        ChatRoom
                    </a>
                    <a data-target="mobile-demo" className="sidenav-trigger">
                        <i className="material-icons">menu</i>
                    </a>
                    <ul className="right hide-on-med-and-down">
                        <li>
                            <a href="/login">Login</a>
                        </li>
                        <li>
                            <a href="/signup">Signup</a>
                        </li>
                        <li>
                            <a href="/logout">Logout</a>
                        </li>
                    </ul>
                </div>
            </nav>

            <ul className="sidenav" id="mobile-demo">
                <li>
                    <a href="/login">Login</a>
                </li>
                <li>
                    <a href="/signup">Signup</a>
                </li>
                <li>
                    <a href="/logout">Logout</a>
                </li>
            </ul>
        </div>
    );
}
