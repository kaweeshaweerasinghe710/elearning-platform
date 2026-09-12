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
        <div className="bg-white rounded-[24px] p-8 shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-gray-100 max-w-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                 Add New Instructor
            </h3>
            
            {message && (
                <div className={`p-4 rounded-xl text-sm font-bold flex items-center gap-3 mb-6 ${isSuccess ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                    <input 
                        type="text" 
                        value={formData.name} 
                        onChange={(e) => setFormData({...formData, name: e.target.value})} 
                        required 
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1256ae] outline-none"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input 
                        type="email" 
                        value={formData.email} 
                        onChange={(e) => setFormData({...formData, email: e.target.value})} 
                        required 
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1256ae] outline-none"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <input 
                        type="password" 
                        value={formData.password} 
                        onChange={(e) => setFormData({...formData, password: e.target.value})} 
                        required 
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1256ae] outline-none"
                    />
                </div>
                <button type="submit" className="w-full mt-4 bg-[#1256ae] hover:bg-[#0c3977] text-white font-bold py-3 rounded-xl shadow-md transition-all">
                    Add Instructor
                </button>
            </form>
        </div>
    );
};

export default AddInstructor;
