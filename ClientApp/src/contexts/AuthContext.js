import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(sessionStorage.getItem('jwtToken') || '');

    const loginToken = (newToken) => {
        setToken(newToken);
        sessionStorage.setItem('jwtToken', newToken);
    };

    const logoutToken = () => {
        setToken('');
        sessionStorage.removeItem('jwtToken');
    };

    return (
        <AuthContext.Provider value={{ token, loginToken, logoutToken}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};