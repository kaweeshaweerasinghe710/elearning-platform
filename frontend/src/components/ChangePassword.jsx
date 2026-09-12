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
        <div className="bg-white rounded-[24px] p-8 shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-gray-100 max-w-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                 Change Password
            </h3>
            
            {message && (
                <div className={`p-4 rounded-xl text-sm font-bold flex items-center gap-3 mb-6 ${isSuccess ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Current Password</label>
                    <input 
                        type="password" 
                        value={formData.oldPassword} 
                        onChange={(e) => setFormData({...formData, oldPassword: e.target.value})} 
                        required 
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1256ae] outline-none"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">New Password</label>
                    <input 
                        type="password" 
                        value={formData.newPassword} 
                        onChange={(e) => setFormData({...formData, newPassword: e.target.value})} 
                        required 
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1256ae] outline-none"
                    />
                </div>
                <button type="submit" className="w-full mt-4 bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 rounded-xl shadow-md transition-all">
                    Update Password
                </button>
            </form>
        </div>
    );
};

export default ChangePassword;
