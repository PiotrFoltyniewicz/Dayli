import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(sessionStorage.getItem('jwtToken') || '');
    const [isLoginFormVisible, setLoginFormVisible] = useState(false);

    const loginToken = (newToken) => {
        setToken(newToken);
        sessionStorage.setItem('jwtToken', newToken);
    };

    const logoutToken = () => {
        setToken('');
        sessionStorage.removeItem('jwtToken');
    };

    const toggleLoginForm = () => {
        setLoginFormVisible(!isLoginFormVisible);
    };

    return (
        <AuthContext.Provider value={{
            token,
            loginToken,
            logoutToken,
            isLoginFormVisible,
            toggleLoginForm
        }}>
            {children}  
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};