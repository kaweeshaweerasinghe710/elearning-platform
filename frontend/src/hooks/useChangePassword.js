import { useState } from 'react';
import api from '../utils/api';
import { isValidPassword } from '../utils/validationUtils';

export const useChangePassword = () => {
    const [formData, setFormData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const changePassword = async (e) => {
        e.preventDefault();
        
        if (!isValidPassword(formData.newPassword)) {
            setMessage("New password must be at least 8 characters, with 1 simple letter & 1 symbol");
            setIsSuccess(false);
            setTimeout(() => setMessage(''), 4000);
            return;
        }

        if (formData.newPassword !== formData.confirmPassword) {
            setMessage("New passwords do not match!");
            setIsSuccess(false);
            setTimeout(() => setMessage(''), 3000);
            return;
        }

        try {
            await api.put('/users/change-password', {
                oldPassword: formData.currentPassword,
                newPassword: formData.newPassword
            });
            setMessage('Password changed successfully!');
            setIsSuccess(true);
            setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
            setTimeout(() => {
                setMessage('');
                setIsSuccess(false);
            }, 3000);
        } catch (error) {
            setMessage(error.response?.data?.message || 'Failed to change password');
            setIsSuccess(false);
            setTimeout(() => setMessage(''), 3000);
        }
    };

    return { formData, setFormData, message, isSuccess, changePassword };
};
