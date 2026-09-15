import { useState } from 'react';
import api from '../utils/api';

const AddInstructor = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/users/add-instructor', formData);
            setMessage('Instructor added successfully!');
            setIsSuccess(true);
            setFormData({ name: '', email: '', password: '' });
        } catch (error) {
            setMessage(error.response?.data?.message || 'Failed to add instructor');
            setIsSuccess(false);
        }
    };

    return (
        <div className="bg-white rounded-md p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
                 Add New Instructor
            </h3>
            
            {message && (
                <div className={`p-4 rounded-md text-sm font-medium mb-6 border ${isSuccess ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">Name</label>
                    <input 
                        type="text" 
                        value={formData.name} 
                        onChange={(e) => setFormData({...formData, name: e.target.value})} 
                        required 
                        className="w-full p-2 bg-white border border-gray-300 rounded-md focus:ring-1 focus:ring-black outline-none text-sm"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">Email</label>
                    <input 
                        type="email" 
                        value={formData.email} 
                        onChange={(e) => setFormData({...formData, email: e.target.value})} 
                        required 
                        className="w-full p-2 bg-white border border-gray-300 rounded-md focus:ring-1 focus:ring-black outline-none text-sm"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">Password</label>
                    <input 
                        type="password" 
                        value={formData.password} 
                        onChange={(e) => setFormData({...formData, password: e.target.value})} 
                        required 
                        className="w-full p-2 bg-white border border-gray-300 rounded-md focus:ring-1 focus:ring-black outline-none text-sm"
                    />
                </div>
                <button type="submit" className="w-full mt-2 bg-black hover:bg-gray-800 text-white font-medium py-2 rounded-md transition-colors text-sm">
                    Add Instructor
                </button>
            </form>
        </div>
    );
};

export default AddInstructor;
