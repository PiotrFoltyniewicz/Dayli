import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(sessionStorage.getItem('jwtToken') || '');

    const login = (newToken) => {
        setToken(newToken);
        sessionStorage.setItem('jwtToken', newToken);
    };

    const logout = () => {
        setToken('');
        sessionStorage.removeItem('jwtToken');
    };

    return (
        <AuthContext.Provider value={{ token, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};