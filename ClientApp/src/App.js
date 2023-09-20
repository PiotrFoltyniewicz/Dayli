import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import Navbar from './components/Navbar';
import './custom.css';
function App() {
    const displayName = App.name;
    return (
        <div>
            <Navbar/>
            <Routes>
                {AppRoutes.map((route, index) => {
                    const { element, ...rest } = route;
                    return <Route key={index} {...rest} element={element} />;
                })}
            </Routes>
        </div>
    );
}
export default App;