import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { UserContext } from './UserContext.js';
import Chat from './components/chat/Chat.js';
import Home from './components/home/Home.js';
import Navbar from './components/navbar/Navbar.js';
import Login from './components/auth/Login.js';
import Signup from './components/auth/Signup.js';

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const verify = async () => {
            try {
                const res = await fetch('/auth/verify', {
                    method: 'POST',
                    // credentials: 'include',
                });
                console.log(res);
                const data = await res.json();
                console.log(data);
                if (data) {
                    setUser(data);
                }
            } catch (err) {
                console.log(err);
            }
        };
        verify();
    }, []);

    return (
        <Router>
            <div className="App">
                <UserContext.Provider value={{ user, setUser }}>
                    <Navbar />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/login" component={Login} />
                        <Route path="/signup" component={Signup} />
                        <Route
                            path="/chat/:roomID/:roomName"
                            component={Chat}
                        />
                    </Switch>
                </UserContext.Provider>
            </div>
        </Router>
    );
}

export default App;
