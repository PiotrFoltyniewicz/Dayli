import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Login from './components/Login';
import './custom.css';
function App() {
    const displayName = App.name;
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
        fetch('api/user',requestOptions)
            .then(response => console.log(response.json()));
    }
    */
    return (
        <div>
            <Navbar/>
            <Routes>
                <Route index element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </div>
    );
}
export default App;