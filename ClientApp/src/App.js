import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Login from './components/Login';
import './custom.css';
import { AuthProvider } from './contexts/AuthContext';

function App() {
    /*
    useEffect(() => {
        test();
    });

    function test() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: 'papasmerf',
                password: 'smurfcat123'
            })
        }
        fetch('api/userregistration',requestOptions)
            .then(response => console.log(response.json()));
    }
    */
    return (
        <div>
            <AuthProvider>
                <Navbar />
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/about" element={<h3>About</h3>} />
                    <Route path="/profile" element={<Login />} />
                </Routes>
            </AuthProvider>
        </div>
    );
}
export default App;