import { useState } from 'react';
import { useInstructorCourses } from '../hooks/useInstructorCourses';
import InstructorCourseCard from './InstructorCourseCard';
import CourseEditor from './CourseEditor';

const InstructorCourses = () => {
    const { courses, loading, handleDelete, handleUpdate } = useInstructorCourses();
    const [editingCourse, setEditingCourse] = useState(null);

    if (loading) return <div className="text-center py-20 text-gray-500 font-medium">Loading courses...</div>;
    if (editingCourse) {
        return (
            <CourseEditor
                course={editingCourse}
                onSave={(updatedCourse) => {
                    handleUpdate(updatedCourse);
                    setEditingCourse(null);
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
                    {courses.length} {courses.length === 1 ? 'Course' : 'Courses'}
                </span>
            </div>

            {courses.length === 0 ? (
                <div className="empty-state">
                    <p>You haven't created any courses yet.</p>
                </div>
            ) : (
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
            )}
        </div>
    );
};

export default InstructorCourses;