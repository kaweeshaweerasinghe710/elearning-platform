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
        <div style={{ border: '1px solid #ccc', padding: '20px', marginTop: '20px', borderRadius: '5px' }}>
            <h3>Create a New Course</h3>
            {message && (
                <p style={{ color: message.includes('success') ? 'green' : 'red', fontWeight: 'bold' }}>
                    {message}
                </p>
            )}
            
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <label>Course Title</label><br />
                    <input 
                        type="text" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        required 
                        style={{ width: '100%', padding: '8px' }} 
                    />
                </div>
                
                <div style={{ marginBottom: '10px' }}>
                    <label>Description</label><br />
                    <textarea 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        required 
                        style={{ width: '100%', padding: '8px', minHeight: '80px' }} 
                    />
                </div>
                
                <div style={{ marginBottom: '10px' }}>
                    <label>Course Content (Syllabus or Video URL)</label><br />
                    <input 
                        type="text" 
                        value={content} 
                        onChange={(e) => setContent(e.target.value)} 
                        required 
                        style={{ width: '100%', padding: '8px' }} 
                    />
                </div>
                
                <button type="submit" style={{ padding: '10px 15px', background: 'orange', color: 'black', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
                    Publish Course
                </button>
            </form>
        </div>
    );
};

export default CreateCourse;