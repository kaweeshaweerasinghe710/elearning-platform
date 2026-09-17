import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import api from '../utils/api';
import { validateRegistration } from '../utils/validationUtils';

export const useRegister = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const registerUser = async (e) => {
        e.preventDefault();
        
        const validationError = validateRegistration(name, email, password);
        if (validationError) return setError(validationError);

        try {
            const { data } = await api.post('/users/register', { name, email, password, role: 'student' });
            if (data.needsVerification) {
                navigate(`/verify-email?email=${encodeURIComponent(email)}`);
            } else {
                login(data);
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
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
        name, setName,
        email, setEmail,
        password, setPassword,
        showPassword, setShowPassword,
        error, setError,
        registerUser,
        handleGoogleLogin
    };
};
