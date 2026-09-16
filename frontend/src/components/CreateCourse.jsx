import { useState } from 'react';
import api from '../utils/api';
import TimeSlotBuilder from './TimeSlotBuilder';

const CreateCourse = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState(''); 
    const [schedule, setSchedule] = useState({ startDate: '', weeklySlots: [] });
    
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/courses', { title, description, content, schedule });
            setMessage('Course published successfully!');
            setIsSuccess(true);
            setTimeout(() => {
                setTitle('');
                setDescription('');
                setContent('');
                setSchedule({ startDate: '', weeklySlots: [] });
                setMessage('');
                setIsSuccess(false);
            }, 3000);
        } catch (error) {
            setMessage(error.response?.data?.message || 'Failed to create course');
            setIsSuccess(false);
        }
    };

    return (
        <div className="form-container mb-12">
            <div className="form-header">
                <h2 className="form-title">Create Course</h2>
                <p className="form-subtitle">Fill in the details to publish a new course</p>
            </div>
            
            {message && (
                <div className={`fixed top-24 left-1/2 -translate-x-1/2 z-[100] text-sm font-semibold transition-all duration-300 transform scale-100 opacity-100 animate-in fade-in slide-in-from-top-4 drop-shadow-sm ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
                   {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
                
                <div className="border border-slate-100 rounded-xl p-6 bg-slate-50">
                    <h3 className="text-lg font-bold text-slate-900 mb-6">Basic Information</h3>
                    <div className="space-y-5">
                        <div className="form-group mb-0">
                            <label className="form-label">Course Title</label>
                            <input 
                                type="text" value={title} onChange={(e) => setTitle(e.target.value)} required 
                                placeholder="Course Title"
                                className="form-input"
                            />
                        </div>
                        <div className="form-group mb-0">
                            <label className="form-label">Course Description</label>
                            <textarea 
                                value={description} onChange={(e) => setDescription(e.target.value)} required rows="3"
                                placeholder="Detailed description..."
                                className="form-input resize-none"
                            />
                        </div>
                        <div className="form-group mb-0">
                            <label className="form-label">Course content</label>
                            <textarea 
                                value={content} onChange={(e) => setContent(e.target.value)} rows="2"
                                placeholder=" syllabus info..."
                                className="form-input resize-none"
                            />
                        </div>
                    </div>
                </div>

                <TimeSlotBuilder schedule={schedule} setSchedule={setSchedule} />

                <div className="form-actions">
                    <button type="submit" className="btn-primary w-full py-3 text-base">
                        Publish Course
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateCourse;