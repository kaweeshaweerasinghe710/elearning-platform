import { useState } from 'react';
import api from '../utils/api';
import TimeSlotBuilder from './TimeSlotBuilder';
import { ArrowLeft, Plus } from 'lucide-react';

import EditorSection from './course-editor/EditorSection';
import WeekItem from './course-editor/WeekItem';
import QuizzesSection from './course-editor/QuizzesSection';

const CourseEditor = ({ course, onSave, onUpdate, onCancel }) => {
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
            console.error("Failed to update course", error);
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
            console.error("Failed to update course", error);
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

    return (
        <div className="ce-container">
            <div className="ce-topbar">
                <button onClick={onCancel} className="ce-back-btn"><ArrowLeft size={18} /><span>Back to Courses</span></button>
                {message && (
                    <span className={`text-sm font-medium ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                        {message.text}
                    </span>
                )}
            </div>
            <div className="max-w-5xl mx-auto py-8 px-6">
                <div className="ce-page-title mb-8">
                    <h2 className="text-3xl font-bold text-slate-900">Edit Course</h2>
                    <p className="text-base text-slate-500 mt-2">Update your course details, curriculum by week, and quizzes.</p>
                </div>
                <div className="ce-sections">
                    <EditorSection title="Basic Information" defaultOpen={true}>
                        <div className="space-y-4">
                            <div><label className="form-label">Course Title</label><input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="form-input" placeholder="Course Title" /></div>
                            <div><label className="form-label">Description</label><textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows="3" className="form-input resize-none" placeholder="Course description..." /></div>
                            <div><label className="form-label">General Info</label><textarea value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} rows="2" className="form-input resize-none" placeholder="Welcome messages or syllabus info..." /></div>
                        </div>
                    </EditorSection>
                    <EditorSection title="Schedule & Time Slots" >
                        <TimeSlotBuilder schedule={formData.schedule} setSchedule={(newSchedule) => setFormData({ ...formData, schedule: newSchedule })} />
                    </EditorSection>
                    <EditorSection title="Curriculum (Week by Week)" defaultOpen={true}>
                        <p className="text-sm text-slate-500 mb-4">Structure your course , Add class links, resources, and announcements for  week.</p>
                        <div className="space-y-6">
                            {formData.weeks.map((week, wIdx) => (<WeekItem key={wIdx} week={week} wIdx={wIdx} onChange={(field, val) => updateWeek(wIdx, field, val)} onRemove={() => removeWeek(wIdx)} onSaveWeek={handleSaveWeek} />))}
                            <button type="button" onClick={addWeek} className="ce-add-btn w-full justify-center py-4 text-base border-dashed border-2 bg-slate-50 hover:bg-slate-100"><Plus size={15} /> Add Week</button>
                        </div>
                    </EditorSection>
                    <EditorSection title="Quizzes" >
                        <p className="text-sm text-slate-500 mb-4">Create global quizzes for your course with multiple-choice questions.</p>
                        <QuizzesSection quizzes={formData.quizzes} updateQuiz={updateQuiz} removeQuiz={removeQuiz} addQuiz={addQuiz} />
                    </EditorSection>
                </div>
            </div>
            <div className="ce-bottom-bar flex items-center justify-between">
                <div>
                   {message && (
                        <span className={`text-sm font-medium ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                            {message.text}
                        </span>
                    )}
                </div>
                <div className="flex gap-2">
                    <button onClick={onCancel} className="btn-secondary text-sm px-4 py-2">Cancel</button>
                    <button onClick={handleSave} disabled={saving} className="btn-primary text-sm px-4 py-2">{saving ? 'Saving...' : 'Save Changes'}</button>
                </div>
            </div>
        </div>
    );
};
export default CourseEditor;
