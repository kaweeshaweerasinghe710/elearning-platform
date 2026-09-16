import { useState } from 'react';
import { useEnrollments } from '../hooks/useEnrollments';
import EnrolledCourseDetail from './EnrolledCourseDetail';
import EnrollmentCard from './enrollments/EnrollmentCard';
import Pagination from './course-list/Pagination';

const MyEnrollments = () => {
    const { enrollments, loading, page, setPage, totalPages, unenroll } = useEnrollments();
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [message, setMessage] = useState(null);

    const handleUnenroll = async (courseId) => {
        const result = await unenroll(courseId);
        if (result.success) {
            setMessage({ type: 'success', text: 'Successfully unenrolled' });
            window.dispatchEvent(new Event('syncEnrollments'));
            setTimeout(() => setMessage(null), 3000);
        } else {
            setMessage({ type: 'error', text: result.message });
            setTimeout(() => setMessage(null), 3000);
        }
    };

    if (loading && enrollments.length === 0) return <div className="text-center py-20 text-gray-500 font-medium text-sm">Loading your enrollments...</div>;
    
    if (selectedCourse) {
        return <EnrolledCourseDetail course={selectedCourse} onBack={() => setSelectedCourse(null)} />;
    }

    return (
        <div>
            {message && (
                <div className={`fixed top-24 left-1/2 -translate-x-1/2 z-[100] text-sm font-semibold transition-all duration-300 transform scale-100 opacity-100 animate-in fade-in slide-in-from-top-4 drop-shadow-sm ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                     {message.text}
                </div>
            )}
            <div className="list-header">
           
            </div>

            {enrollments.length === 0 ? (
                <div className="empty-state">
                    You haven't enrolled in any courses yet.
                </div>
            ) : (
                <>
                    <div className="list-grid">
                        {enrollments.map((enrollment) => (
                            <EnrollmentCard 
                                key={enrollment._id} 
                                enrollment={enrollment}
                                onSelect={setSelectedCourse}
                                onUnenroll={handleUnenroll}
                            />
                        ))}
                    </div>
                    <Pagination page={page} setPage={setPage} totalPages={totalPages} />
                </>
            )}
        </div>
    );
};

export default MyEnrollments;