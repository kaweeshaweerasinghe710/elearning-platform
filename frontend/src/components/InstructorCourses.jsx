import { useState } from 'react';
import { useInstructorCourses } from '../hooks/useInstructorCourses';
import InstructorCourseCard from './InstructorCourseCard';
import CourseEditor from './CourseEditor';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const InstructorCourses = () => {
    const { courses, loading, handleDelete, handleUpdate, page, setPage, totalPages, totalCourses } = useInstructorCourses();
    const [editingCourse, setEditingCourse] = useState(null);

    if (loading && courses.length === 0) return <div className="text-center py-20 text-slate-500 font-medium">Loading your courses...</div>;
    if (editingCourse) {
        return (
            <CourseEditor
                course={editingCourse}
                onSave={(updatedCourse) => {
                    handleUpdate(updatedCourse);
                    setEditingCourse(null);
                }}
                onUpdate={(updatedCourse) => {
                    handleUpdate(updatedCourse);
                }}
                onCancel={() => setEditingCourse(null)}
            />
        );
    }

    return (
        <div className="list-container">
            <div className="list-header">
                <h3 className="list-title">My Courses</h3>
                <span className="text-sm font-medium text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200">
                    {totalCourses} {totalCourses === 1 ? 'Course' : 'Courses'}
                </span>
            </div>

            {courses.length === 0 ? (
                <div className="empty-state">
                    <p>You haven't created any courses yet.</p>
                </div>
            ) : (
                <>
                    <div className="list-grid">
                        {courses.map(course => (
                            <InstructorCourseCard 
                                key={course._id} 
                                course={course} 
                                onDelete={handleDelete}
                                onUpdate={handleUpdate}
                                onEdit={() => setEditingCourse(course)}
                            />
                        ))}
                    </div>
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-3 mt-6 py-4 border-t border-slate-100">
                            <button 
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="p-1.5 rounded-md bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <span className="text-sm font-semibold text-slate-600 min-w-[90px] text-center">
                                Page {page} of {totalPages}
                            </span>
                            <button 
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages}
                                className="p-1.5 rounded-md bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default InstructorCourses;