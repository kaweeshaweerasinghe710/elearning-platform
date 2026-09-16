import { useState } from 'react';
import { useCourses } from '../hooks/useCourses';
import { useEnrollments } from '../hooks/useEnrollments';
import CourseCard from './CourseCard'; 
import CourseAdvisor from './CourseAdvisor';
import Pagination from './course-list/Pagination';
import { BookOpen, X } from 'lucide-react';

const CourseList = () => {
    const { courses, loading: coursesLoading, enroll, page, setPage, totalPages } = useCourses();
    const { enrollments } = useEnrollments();
    const [showAdvisor, setShowAdvisor] = useState(false);
    const [enrollMessage, setEnrollMessage] = useState(null);
    const [newlyEnrolled, setNewlyEnrolled] = useState(new Set());
  
    const handleEnroll = async (courseId) => {
        const result = await enroll(courseId);
        if (result.success) {
            setNewlyEnrolled(prev => new Set(prev).add(courseId));
            setEnrollMessage({ type: 'success', text: 'Successfully enrolled in the course' });
            window.dispatchEvent(new Event('syncEnrollments'));
            setTimeout(() => setEnrollMessage(null), 3000);
        } else {
            setEnrollMessage({ type: 'error', text: result.message });
            setTimeout(() => setEnrollMessage(null), 3000);
        }
    };

    if (coursesLoading && courses.length === 0) return <div className="text-center py-20 text-gray-500 font-bold">Loading courses...</div>;

    const getIsEnrolled = (courseId) => {
        return newlyEnrolled.has(courseId) || enrollments.some(enrollment => enrollment.course?._id === courseId);
    };

    return (
        <div className={`grid grid-cols-1 ${showAdvisor ? 'lg:grid-cols-4' : 'lg:grid-cols-1'} gap-6 items-start`}>
            <div className={`${showAdvisor ? 'lg:col-span-3' : 'lg:col-span-1'} list-container transition-all duration-300`}>
                {enrollMessage && (
                    <div className={`fixed top-24 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-full shadow-xl border font-bold flex items-center gap-2 transition-all duration-300 transform scale-100 opacity-100 ${enrollMessage.type === 'success' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                       <span className="text-xl">{enrollMessage.type === 'success' ? '✅' : '❌'}</span> {enrollMessage.text}
                    </div>
                )}
                <div className="list-header flex justify-end items-center mb-6">
                   
                    {!showAdvisor && (
                        <button 
                            onClick={() => setShowAdvisor(true)}
                            className="hidden lg:flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-sm rounded-lg border border-blue-100 transition-colors cursor-pointer"
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
                        <div className="list-grid">
                            {courses.map((course) => (
                                <CourseCard 
                                    key={course._id} 
                                    course={course} 
                                    onEnroll={handleEnroll} 
                                    isEnrolled={getIsEnrolled(course._id)}
                                />
                            ))}
                        </div>
                        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
                    </>
                )}
            </div>
            {showAdvisor && (
                <div className="lg:col-span-1 hidden lg:block relative">
                    <button 
                        onClick={() => setShowAdvisor(false)} 
                        className="absolute -left-3 top-10 w-7 h-7 bg-white border border-slate-200 shadow-md rounded-full flex items-center justify-center text-slate-500 hover:text-slate-800 z-10 cursor-pointer"
                        title="Close Advisor"
                    >
                        <X size={14} />
                    </button>
                    <CourseAdvisor onEnroll={handleEnroll} />
                </div>
            )}
        </div>
    );
};

export default CourseList;