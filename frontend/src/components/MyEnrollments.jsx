import { useState } from 'react';
import { useEnrollments } from '../hooks/useEnrollments';
import EnrolledCourseDetail from './EnrolledCourseDetail';
import EnrollmentCard from './enrollments/EnrollmentCard';
import Pagination from './course-list/Pagination';
import ConfirmModal from './ConfirmModal';

const MyEnrollments = () => {
    const { enrollments, loading, page, setPage, totalPages, unenroll } = useEnrollments();
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [message, setMessage] = useState(null);
    const [search, setSearch] = useState('');
    const [confirmUnenroll, setConfirmUnenroll] = useState(null);

    const handleConfirmUnenroll = async () => {
        if (!confirmUnenroll) return;
        const result = await unenroll(confirmUnenroll);
        if (result.success) {
            setMessage({ type: 'success', text: 'Successfully unenrolled' });
            window.dispatchEvent(new Event('syncEnrollments'));
            setTimeout(() => setMessage(null), 3000);
        } else {
            setMessage({ type: 'error', text: result.message });
            setTimeout(() => setMessage(null), 3000);
        }
        setConfirmUnenroll(null);
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
            <div className="list-header flex items-center mb-6">
                <input 
                    type="text" 
                    placeholder="Search your courses..." 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)} 
                    className="p-2.5 bg-white border border-gray-200 rounded-lg text-sm w-full md:w-96 outline-none focus:ring-1 focus:ring-primary shadow-sm"
                />
            </div>

            {enrollments.length === 0 ? (
                <div className="empty-state">
                    You haven't enrolled in any courses yet.
                </div>
            ) : (
                <>
                    <div className={`list-grid transition-opacity duration-300 ${loading ? 'opacity-50 pointer-events-none' : ''}`}>
                        {enrollments.filter(e => e.course?.title?.toLowerCase().includes(search.toLowerCase())).map((enrollment) => (
                            <EnrollmentCard 
                                key={enrollment._id} 
                                enrollment={enrollment}
                                onSelect={setSelectedCourse}
                                onUnenroll={setConfirmUnenroll}
                            />
                        ))}
                    </div>
                    <Pagination page={page} setPage={setPage} totalPages={totalPages} />
                </>
            )}

            <ConfirmModal 
                isOpen={!!confirmUnenroll}
                title="Unenroll from Course"
                message="Are you sure you want to unenroll? You will lose immediate access to all course materials and your progress."
                confirmText="Unenroll"
                isDanger={true}
                onConfirm={handleConfirmUnenroll}
                onCancel={() => setConfirmUnenroll(null)}
            />
        </div>
    );
};

export default MyEnrollments;