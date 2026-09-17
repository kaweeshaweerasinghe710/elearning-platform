import { createContext, useState } from 'react';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = sessionStorage.getItem('userInfo');
        return savedUser ? JSON.parse(savedUser) : null;
    });


    const login = (userData) => {
        sessionStorage.setItem('userInfo', JSON.stringify(userData)); 
        setUser(userData);
    };


    const logout = () => {
        sessionStorage.removeItem('userInfo');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;