import { useState } from 'react';
import { useCourses } from '../hooks/useCourses';
import { useEnrollments } from '../hooks/useEnrollments';
import CourseCard from './CourseCard'; 
import CourseAdvisor from './CourseAdvisor';
import Pagination from './course-list/Pagination';
import { BookOpen, X } from 'lucide-react';
import ConfirmModal from './ConfirmModal';

const CourseList = () => {
    const { courses, loading: coursesLoading, enroll, page, setPage, totalPages } = useCourses();
    const { enrollments } = useEnrollments();
    const [showAdvisor, setShowAdvisor] = useState(false);
    const [enrollMessage, setEnrollMessage] = useState(null);
    const [newlyEnrolled, setNewlyEnrolled] = useState(new Set());
    const [search, setSearch] = useState('');
    const [confirmEnroll, setConfirmEnroll] = useState(null);
  
    const handleConfirmEnroll = async () => {
        if (!confirmEnroll) return;
        const result = await enroll(confirmEnroll);
        if (result.success) {
            setNewlyEnrolled(prev => new Set(prev).add(confirmEnroll));
            setEnrollMessage({ type: 'success', text: 'Successfully enrolled in the course' });
            window.dispatchEvent(new Event('syncEnrollments'));
            setTimeout(() => setEnrollMessage(null), 3000);
        } else {
            setEnrollMessage({ type: 'error', text: result.message });
            setTimeout(() => setEnrollMessage(null), 3000);
        }
        setConfirmEnroll(null);
    };

    if (coursesLoading && courses.length === 0) return <div className="text-center py-20 text-gray-500 font-bold">Loading courses...</div>;

    const getIsEnrolled = (courseId) => {
        return newlyEnrolled.has(courseId) || enrollments.some(enrollment => enrollment.course?._id === courseId);
    };

    return (
        <div className={`grid grid-cols-1 ${showAdvisor ? 'lg:grid-cols-4' : 'lg:grid-cols-1'} gap-6 items-start`}>
            <div className={`${showAdvisor ? 'lg:col-span-3' : 'lg:col-span-1'} list-container transition-all duration-300`}>
                {enrollMessage && (
                    <div className={`fixed top-24 left-1/2 -translate-x-1/2 z-[100] text-sm font-semibold transition-all duration-300 transform scale-100 opacity-100 animate-in fade-in slide-in-from-top-4 drop-shadow-sm ${enrollMessage.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                       {enrollMessage.text}
                    </div>
                )}
                <div className="list-header flex justify-between items-center mb-6 gap-4">
                    <input 
                        type="text" 
                        placeholder="Search courses..." 
                        value={search} 
                        onChange={(e) => setSearch(e.target.value)} 
                        className="p-2 bg-white border border-gray-200 rounded-lg text-sm w-full md:w-64 outline-none focus:ring-1 focus:ring-primary shadow-sm"
                    />
                    {!showAdvisor && (
                        <button 
                            onClick={() => setShowAdvisor(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-sm rounded-lg border border-blue-100 transition-colors cursor-pointer shadow-sm w-full lg:w-auto justify-center"
                        >
                            <BookOpen size={16} /> Course Advisor
                        </button>
                    )}
                </div>
                
                {courses.length === 0 ? (
                    <div className="empty-state">
                        No courses available at the moment.
                    </div>
                ) : (
                    <>
                        <div className={`list-grid transition-opacity duration-300 ${coursesLoading ? 'opacity-50 pointer-events-none' : ''}`}>
                            {courses.filter(c => c.title.toLowerCase().includes(search.toLowerCase())).map((course) => (
                                <CourseCard 
                                    key={course._id} 
                                    course={course} 
                                    onEnroll={setConfirmEnroll} 
                                    isEnrolled={getIsEnrolled(course._id)}
                                />
                            ))}
                        </div>
                        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
                    </>
                )}
            </div>
            
            {showAdvisor && (
                <div className="lg:col-span-1 block relative w-full lg:w-auto">
                    <button 
                        onClick={() => setShowAdvisor(false)} 
                        className="absolute -left-3 lg:-left-3 top-0 lg:top-10 w-8 h-8 bg-white border border-slate-200 shadow-md rounded-full flex items-center justify-center text-slate-500 hover:text-slate-800 z-50 cursor-pointer"
                        title="Close Advisor"
                    >
                        <X size={16} />
                    </button>
                    <CourseAdvisor onEnroll={setConfirmEnroll} />
                </div>
            )}

            <ConfirmModal 
                isOpen={!!confirmEnroll}
                title="Confirm Enrollment"
                message="Are you sure you want to enroll in this course? You can unenroll at any time."
                confirmText="Enroll"
                onConfirm={handleConfirmEnroll}
                onCancel={() => setConfirmEnroll(null)}
            />
        </div>
    );
};

export default CourseList;