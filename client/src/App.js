import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React, { useState } from 'react';
import { UserContext } from './UserContext.js';
import Chat from './components/chat/Chat.js';
import Home from './components/home/Home.js';
import Navbar from './components/navbar/Navbar.js';

function App() {
    const [user, setUser] = useState(null);

    return (
        <Router>
            <div className="App">
                <UserContext.Provider value={{ user, setUser }}>
                    <Navbar />
                    <Switch>
                        <Route exact path="/" component={Home} />
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
