import { useState } from 'react';
import api from '../utils/api';

const ChangePassword = () => {
    const [formData, setFormData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const passwordRegex = /^(?=.*[a-z])(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?-]).{8,}$/;
        if (!passwordRegex.test(formData.newPassword)) {
            setMessage("New password must be at least 6 characters, with 1 simple letter & 1 symbol");
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

    return (
        <div className="form-container relative">
            <h3 className="form-title mb-6">
                Change Password
            </h3>
            
            {message && (
                <div className={`fixed top-24 left-1/2 -translate-x-1/2 z-[100] text-sm font-semibold transition-all duration-300 transform scale-100 opacity-100 animate-in fade-in slide-in-from-top-4 drop-shadow-sm ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
                   {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col flex-1 space-y-4">
                <div className="form-group">
                    <label className="form-label">Current Password</label>
                    <input 
                        type="password" 
                        value={formData.currentPassword} 
                        onChange={(e) => setFormData({...formData, currentPassword: e.target.value})} 
                        required 
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">New Password</label>
                    <input 
                        type="password" 
                        value={formData.newPassword} 
                        onChange={(e) => setFormData({...formData, newPassword: e.target.value})} 
                        required 
                        className="form-input"
                    />
                </div>
                <div className="form-group pb-4">
                    <label className="form-label">Confirm New Password</label>
                    <input 
                        type="password" 
                        value={formData.confirmPassword} 
                        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} 
                        required 
                        className="form-input"
                    />
                </div>
                <div className="mt-auto pt-4">
                    <button type="submit" className="btn-primary w-full">
                        Update Password
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChangePassword;
