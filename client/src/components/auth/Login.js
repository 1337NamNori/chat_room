import React from 'react';

export default function Login() {
    return (
        <div className="container">
            <h2 className="center">Login</h2>
            <div className="row">
                <form className="col s12">
                    <div className="row">
                        <div className="input-field col s12">
                            <input
                                id="username"
                                type="text"
                                className="validate"
                            />
                            <label htmlFor="username">User Name</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input
                                id="password"
                                type="password"
                                className="validate"
                            />
                            <label htmlFor="password">Password</label>
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
