import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Profile from './components/Profile';
import About from './components/About';
import TaskPage from './components/TaskPage';
import NotePage from './components/NotePage';
import HabitPage from './components/HabitPage';
import './custom.css';
import { AuthProvider} from './contexts/AuthContext';

function App() {
    return (
        <div className="App">
            <AuthProvider>
                <Navbar/>
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="/home" element={<Home/>} />
                    <Route path="/about" element={<About />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/task" element={<TaskPage />} />
                    <Route path="/habit" element={<HabitPage />} />
                    <Route path="/note" element={<NotePage />} />
                </Routes>
                { /*<LoremIpsum /> */ }
                <Login/>
            </AuthProvider>
        </div>
    );
}

export default App;