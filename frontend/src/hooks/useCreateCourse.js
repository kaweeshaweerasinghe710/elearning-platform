import { useState } from 'react';
import api from '../utils/api';

export const useCreateCourse = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState(''); 
    const [schedule, setSchedule] = useState({ startDate: '', weeklySlots: [] });
    
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const createCourse = async (e) => {
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

    return {
        title, setTitle,
        description, setDescription,
        content, setContent,
        schedule, setSchedule,
        message, isSuccess,
        createCourse
    };
};
