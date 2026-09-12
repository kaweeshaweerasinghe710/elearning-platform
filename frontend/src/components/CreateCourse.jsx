import { useState } from 'react';
import api from '../utils/api';

const CreateCourse = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/courses', { title, description, content });
            setMessage('Course created successfully!');
            setTitle('');
            setDescription('');
            setContent('');
        } catch (error) {
            setMessage(error.response?.data?.message || 'Failed to create course');
        }
    };

    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Create a New Course</h3>
            
            {message && (
                <div className={`p-3 rounded mb-4 ${message.includes('success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {message}
                </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Course Title</label>
                    <input 
                        type="text" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        required 
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                </div>
                
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Description</label>
                    <textarea 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        required 
                        rows="3"
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                </div>
                
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Course Content (Syllabus or Video URL)</label>
                    <input 
                        type="text" 
                        value={content} 
                        onChange={(e) => setContent(e.target.value)} 
                        required 
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                </div>
                
                <button 
                    type="submit" 
                    className="w-full md:w-auto bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded transition duration-300"
                >
                    Publish Course
                </button>
            </form>
        </div>
    );
};

export default CreateCourse;