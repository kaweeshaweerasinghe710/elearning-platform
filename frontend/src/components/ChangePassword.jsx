import { useState } from 'react';
import api from '../utils/api';

const ChangePassword = () => {
    const [formData, setFormData] = useState({ oldPassword: '', newPassword: '' });
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put('/users/change-password', formData);
            setMessage('Password changed successfully!');
            setIsSuccess(true);
            setFormData({ oldPassword: '', newPassword: '' });
        } catch (error) {
            setMessage(error.response?.data?.message || 'Failed to change password');
            setIsSuccess(false);
        }
    };

    return (
        <div className="form-container">
            <h3 className="form-title mb-6">
                Change Password
            </h3>
            
            {message && (
                <div className={`p-4 rounded-md text-sm font-medium mb-6 border ${isSuccess ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
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
