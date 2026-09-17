import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import api from '../utils/api';
import { validateLogin } from '../utils/validationUtils';

export const useLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const loginUser = async (e) => {
        e.preventDefault();
        
        const validationError = validateLogin(email, password);
        if (validationError) return setError(validationError);

        try {
            const { data } = await api.post('/users/login', { email, password });
            login(data);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    const handleGoogleLogin = async (credential) => {
        try {
            const { data } = await api.post('/users/google', { credential });
            login(data);
            navigate('/dashboard');
        } catch { 
            setError('Google Login Failed.'); 
        }
    };

    return {
        email, setEmail,
        password, setPassword,
        showPassword, setShowPassword,
        error, setError,
        loginUser,
        handleGoogleLogin
    };
};
