import { useState } from 'react';
import api from '../utils/api';

const AddInstructor = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', securityCode: '' });
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/users/add-instructor', formData);
            setMessage('Instructor added successfully!');
            setIsSuccess(true);
            setFormData({ name: '', email: '', password: '', securityCode: '' });
        } catch (error) {
            setMessage(error.response?.data?.message || 'Failed to add instructor');
            setIsSuccess(false);
        }
    };

    return (
        <div className="form-container">
            <h3 className="form-title mb-6">
                 Add New Instructor
            </h3>
            
            {message && (
                <div className={`p-4 rounded-md text-sm font-medium mb-6 border ${isSuccess ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col flex-1 space-y-4">
                <div className="form-group">
                    <label className="form-label">Name</label>
                    <input 
                        type="text" 
                        value={formData.name} 
                        onChange={(e) => setFormData({...formData, name: e.target.value})} 
                        required 
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Email</label>
                    <input 
                        type="email" 
                        value={formData.email} 
                        onChange={(e) => setFormData({...formData, email: e.target.value})} 
                        required 
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Password</label>
                    <input 
                        type="password" 
                        value={formData.password} 
                        onChange={(e) => setFormData({...formData, password: e.target.value})} 
                        required 
                        className="form-input"
                    />
                </div>
                <div className="form-group pb-4">
                    <label className="form-label text-red-600">Admin Security Code</label>
                    <input 
                        type="password" 
                        value={formData.securityCode} 
                        onChange={(e) => setFormData({...formData, securityCode: e.target.value})} 
                        required 
                        placeholder="Required for authorization"
                        className="form-input border-red-200 focus:border-red-500 focus:ring-red-500/20"
                    />
                </div>
                <div className="mt-auto pt-4">
                    <button type="submit" className="btn-primary w-full">
                        Add Instructor
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddInstructor;
