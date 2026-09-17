import TimeSlotBuilder from './TimeSlotBuilder';
import { ArrowLeft, Plus } from 'lucide-react';
import { useState } from 'react';
import Button from './Button';

import EditorSection from './course-editor/EditorSection';
import WeekItem from './course-editor/WeekItem';
import QuizzesSection from './course-editor/QuizzesSection';
import { useCourseEditor } from '../hooks/useCourseEditor';

const CourseEditor = ({ course, onSave, onUpdate, onCancel }) => {
    const [activeTab, setActiveTab] = useState('details');

    const { 
        formData, setFormData, saving, message,
        handleSave, handleSaveWeek, addWeek, updateWeek, removeWeek,
        addQuiz, updateQuiz, removeQuiz 
    } = useCourseEditor(course, onSave, onUpdate);

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
                    <p className="text-base text-slate-500 mt-2">Manage  your course details, curriculum by week, and quizzes.</p>
                </div>

                <div className="flex gap-4 mb-8">
                    <button 
                        type="button"
                        onClick={() => setActiveTab('details')}
                        className={`nav-link-base ${activeTab === 'details' ? 'nav-link-active' : 'nav-link-inactive'}`}
                    >
                        Edit Details
                    </button>
                    <button 
                        type="button"
                        onClick={() => setActiveTab('content')}
                        className={`nav-link-base ${activeTab === 'content' ? 'nav-link-active' : 'nav-link-inactive'}`}
                    >
                         Add Content
                    </button>
                </div>

                <div className="ce-sections">
                    {activeTab === 'details' ? (
                        <>
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
                        </>
                    ) : (
                        <>
                            <EditorSection title="Curriculum (Week by Week)" defaultOpen={true}>
                                <p className="text-sm text-slate-500 mb-4">Structure your course, Add class links, resources, and announcements for each week.</p>
                                <div className="space-y-6">
                                    {formData.weeks.map((week, wIdx) => (<WeekItem key={wIdx} week={week} wIdx={wIdx} onChange={(field, val) => updateWeek(wIdx, field, val)} onRemove={() => removeWeek(wIdx)} onSaveWeek={handleSaveWeek} />))}
                                    <Button type="button" variant="outline" onClick={addWeek} className="w-full py-4 border-dashed border-2"><Plus size={18} /> Add New Week (Module)</Button>
                                </div>
                            </EditorSection>
                            <EditorSection title="Quizzes" >
                                <p className="text-sm text-slate-500 mb-4">Create global quizzes for your course with multiple-choice questions.</p>
                                <QuizzesSection quizzes={formData.quizzes} updateQuiz={updateQuiz} removeQuiz={removeQuiz} addQuiz={addQuiz} />
                            </EditorSection>
                        </>
                    )}
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
                    <Button variant="secondary" onClick={onCancel}>Cancel</Button>
                    <Button variant="primary" onClick={handleSave} disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</Button>
                </div>
            </div>
        </div>
    );
};
export default CourseEditor;
