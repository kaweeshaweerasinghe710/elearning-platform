import { useState } from 'react';
import { useEnrollments } from '../hooks/useEnrollments';
import EnrolledCourseDetail from './EnrolledCourseDetail';

const MyEnrollments = () => {
    const { enrollments, loading } = useEnrollments();
    const [selectedCourse, setSelectedCourse] = useState(null);


    if (loading) return <div className="text-center py-20 text-gray-500 font-medium text-sm">Loading your enrollments...</div>;
    
    if (selectedCourse) {
        return <EnrolledCourseDetail course={selectedCourse} onBack={() => setSelectedCourse(null)} />;
    }

    return (
        <div className="list-container">
            <div className="list-header">
                <h3 className="list-title">My Enrollments</h3>
            </div>

            {enrollments.length === 0 ? (
                <div className="empty-state">
                    You haven't enrolled in any courses yet.
                </div>
            ) : (
                <div className="list-grid">
                    {enrollments.map((enrollment) => (
                        <div 
                            key={enrollment._id} 
                            onClick={() => setSelectedCourse(enrollment.course)}
                            className="course-card"
                        >
                            <div className="course-card-header h-16">
                                <h4 className="course-card-title text-lg truncate">
                                    {enrollment.course?.title}
                                </h4>
                            </div>
                            
                            <div className="course-card-body">
                                <p className="course-card-desc">
                                    {enrollment.course?.description}
                                </p>
                                
                                <div className="mt-5 pt-4 border-t border-slate-100 flex justify-between items-center text-sm font-semibold text-indigo-600">
                                    <span>Continue Learning</span>
                                    <span>&rarr;</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyEnrollments;