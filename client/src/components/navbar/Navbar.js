import React, { useContext } from 'react';
import { UserContext } from '../../UserContext.js';
import SignedInMenu from './SignedInMenu';
import SignedOutMenu from './SignedOutMenu';

export default function Navbar() {
    const { user, setUser } = useContext(UserContext);

    const logout = async () => {
        try {
            const res = await fetch('http://localhost:5000/auth/logout', {
                method: 'POST',
                // credentials: 'include',
            });
            const data = await res.json();
            console.log(data);
            setUser(null);
        } catch (err) {
            console.log(err);
        }
    };

    const menu = user ? <SignedInMenu logout={logout} /> : <SignedOutMenu />;

    return (
        <div>
            <nav>
                <div className="nav-wrapper container">
                    <a href="/" className="brand-logo">
                        ChatRoom
                    </a>
                    <a
                        href="#"
                        data-target="mobile-demo"
                        className="sidenav-trigger"
                    >
                        <i className="material-icons">menu</i>
                    </a>
                    <ul className="right hide-on-med-and-down">{menu}</ul>
                </div>
            </nav>

            <ul className="sidenav" id="mobile-demo">
                {menu}
            </ul>
        </div>
    );
}
