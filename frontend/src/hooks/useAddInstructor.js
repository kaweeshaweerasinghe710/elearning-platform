import { useState } from 'react';
import api from '../utils/api';

export const useAddInstructor = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', securityCode: '' });
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const addInstructor = async (e) => {
        e.preventDefault();
        try {
            await api.post('/users/add-instructor', formData);
            setMessage('Instructor added successfully!');
            setIsSuccess(true);
            setFormData({ name: '', email: '', password: '', securityCode: '' });
            setTimeout(() => {
                setMessage('');
                setIsSuccess(false);
            }, 3000);
        } catch (error) {
            setMessage(error.response?.data?.message || 'Failed to add instructor');
            setIsSuccess(false);
            setTimeout(() => setMessage(''), 3000);
        }
    };

    return { formData, setFormData, message, isSuccess, addInstructor };
};
