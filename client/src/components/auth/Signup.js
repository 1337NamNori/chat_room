import React, { useState, useContext } from 'react';
import { UserContext } from '../../UserContext';
import { Redirect } from 'react-router-dom';

export default function Signup() {
    const { user, setUser } = useContext(UserContext);

    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault();
        setUsernameError('');
        setEmailError('');
        setPasswordError('');
        console.log(username, password, email);
        try {
            const res = await fetch('http://localhost:5000/signup', {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({ username, password, email }),
                headers: { 'Content-Type': 'application/json' },
            });
            const data = await res.json();
            console.log(data);
            if (data.errors) {
                setUsernameError(data.errors.username);
                setEmailError(data.errors.email);
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
            <h2 className="center-align">Signup</h2>
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
                                id="email"
                                name="email"
                                type="email"
                                className="validate"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label htmlFor="email">Email</label>
                            <p className="red-text">{emailError}</p>
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
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
