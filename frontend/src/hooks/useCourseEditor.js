import { useState } from 'react';
import api from '../utils/api';

export const useCourseEditor = (course, onSave, onUpdate) => {
    const [formData, setFormData] = useState({
        title: course.title,
        description: course.description,
        content: course.content || '',
        schedule: course.schedule || { startDate: '', weeklySlots: [] },
        weeks: course.weeks || [],
        quizzes: course.quizzes || [],
    });
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    const handleSave = async () => {
        setSaving(true);
        setMessage('');
        try {
            const { data } = await api.put(`/courses/${course._id}`, formData);
            if (onUpdate) onUpdate(data);
            setMessage({ type: 'success', text: 'Course updated successfully!' });
            onSave(data);
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to update course' });
        } finally {
            setSaving(false);
            setTimeout(() => setMessage(''), 3000);
        }
    };

    const handleSaveWeek = async () => {
        setSaving(true);
        setMessage('');
        try {
            const { data } = await api.put(`/courses/${course._id}`, formData);
            if (onUpdate) onUpdate(data);
            setMessage({ type: 'success', text: 'Week saved successfully!' });
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to save week' });
        } finally {
            setSaving(false);
            setTimeout(() => setMessage(''), 3000);
        }
    };

    const addWeek = () => setFormData({ ...formData, weeks: [...formData.weeks, { title: `Week ${formData.weeks.length + 1}`, announcement: '', classLinks: [], resources: [] }] });
    
    const updateWeek = (idx, field, val) => {
        const updated = [...formData.weeks]; updated[idx] = { ...updated[idx], [field]: val };
        setFormData({ ...formData, weeks: updated });
    };
    
    const removeWeek = (idx) => setFormData({ ...formData, weeks: formData.weeks.filter((_, i) => i !== idx) });

    const addQuiz = () => setFormData({ ...formData, quizzes: [...formData.quizzes, { title: '', questions: [{ question: '', options: ['', '', '', ''], correctAnswer: 0 }] }] });
    
    const updateQuiz = (idx, field, val) => {
        const updated = [...formData.quizzes]; updated[idx] = { ...updated[idx], [field]: val };
        setFormData({ ...formData, quizzes: updated });
    };
    
    const removeQuiz = (idx) => setFormData({ ...formData, quizzes: formData.quizzes.filter((_, i) => i !== idx) });

    return {
        formData, setFormData, saving, message,
        handleSave, handleSaveWeek, addWeek, updateWeek, removeWeek,
        addQuiz, updateQuiz, removeQuiz
    };
};
