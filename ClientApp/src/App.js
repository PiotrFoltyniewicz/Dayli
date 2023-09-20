import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import './custom.css';

export default function App(){
    const displayName = App.name;
    return (
        <div><p>test</p>
        <Routes>
            {AppRoutes.map((route, index) => {
            const { element, ...rest } = route;
                return <Route key={index} {...rest} element={element} />;
            })}
        </Routes>
        </div>
    );

  
}
