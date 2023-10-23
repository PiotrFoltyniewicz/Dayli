import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Profile from './components/Profile'
import LoremIpsum from './components/LoremIpsum';
import './custom.css';
import { AuthProvider } from './contexts/AuthContext';
import "inter-ui/inter.css";

function App() {

    const [logPopUp, setLogPopUp] = useState(false)


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
        <div className="App">
            <AuthProvider>
                <Navbar setLogPopUp={setLogPopUp} />
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/about" element={<h3>About</h3>} />
                    <Route path="/profile" element={<Profile/>} />
                </Routes>
                <LoremIpsum />
                {logPopUp && <Login /> }
            </AuthProvider>
        </div>
    );
}
export default App;