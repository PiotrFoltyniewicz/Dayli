import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Profile from './components/Profile';
import LoremIpsum from './components/LoremIpsum';
import About from './components/About'
import Task from './components/Task'
import './custom.css';
import { AuthProvider } from './contexts/AuthContext';

function App() {
    const [logPopUp, setLogPopUp] = useState(false);

    return (
        <div className="App">
            <AuthProvider>
                <Navbar setLogPopUp={setLogPopUp} />
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/task" element={<Task /> } />
                </Routes>
                { /*<LoremIpsum /> */ }
                {logPopUp && <Login setLogPopUp={setLogPopUp} />}
            </AuthProvider>
        </div>
    );
}

export default App;