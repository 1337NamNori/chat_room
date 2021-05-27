import React, { useState, useContext } from 'react';
import { UserContext } from '../../UserContext';
import { Redirect } from 'react-router-dom';

export default function Login() {
    const { user, setUser } = useContext(UserContext);

    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault();

        setUsernameError('');
        setPasswordError('');
        try {
            const res = await fetch('http://localhost:5000/auth/login', {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({ username, password }),
                headers: { 'Content-Type': 'application/json' },
            });
            const data = await res.json();
            if (data.errors) {
                setUsernameError(data.errors.username);
                setPasswordError(data.errors.password);
            }
            if (data.user) {
                setUser(data.user);
            }
        } catch (err) {
            console.log(err);
        }
    };
    if (user) {
        return <Redirect to="/" />;
    }

    return (
        <div className="container">
            <h2 className="center">Login</h2>
            <div className="row">
                <form className="col s12" onSubmit={submitHandler}>
                    <div className="row">
                        <div className="input-field col s12">
                            <input
                                id="username"
                                name="username"
                                type="text"
                                className="validate"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <label htmlFor="username">User Name</label>
                            <p className="red-text">{usernameError}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                className="validate"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <label htmlFor="password">Password</label>
                            <p className="red-text">{passwordError}</p>
                        </div>
                    </div>
                    <div className="row center">
                        <button type="submit" className="btn">
                            Log In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
