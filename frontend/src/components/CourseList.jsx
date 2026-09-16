import { useState } from 'react';
import { useCourses } from '../hooks/useCourses';
import { useEnrollments } from '../hooks/useEnrollments';
import CourseCard from './CourseCard'; 
import CourseAdvisor from './CourseAdvisor';
import { ChevronLeft, ChevronRight, BookOpen, X } from 'lucide-react';

const CourseList = () => {
    const { courses, loading: coursesLoading, enroll, page, setPage, totalPages } = useCourses();
    const { enrollments } = useEnrollments();
    const [showAdvisor, setShowAdvisor] = useState(false);
  
    const handleEnroll = async (courseId) => {
        const result = await enroll(courseId);
        if (result.success) {
            alert('Successfully enrolled in the course! ');
            window.location.reload(); 
        } else {
            alert(result.message);
        }
    };

    if (coursesLoading) return <div className="text-center py-20 text-gray-500 font-bold">Loading courses...</div>;

    const getIsEnrolled = (courseId) => {
        return enrollments.some(enrollment => enrollment.course?._id === courseId);
    };

    return (
        <div className={`grid grid-cols-1 ${showAdvisor ? 'xl:grid-cols-4' : 'xl:grid-cols-1'} gap-6 items-start`}>
            <div className={`${showAdvisor ? 'xl:col-span-3' : 'xl:col-span-1'} list-container transition-all duration-300`}>
                <div className="list-header flex justify-between items-center">
                    <h3 className="list-title">Explore Courses</h3>
                    {!showAdvisor && (
                        <button 
                            onClick={() => setShowAdvisor(true)}
                            className="hidden xl:flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-sm rounded-lg border border-blue-100 transition-colors cursor-pointer"
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
            {showAdvisor && (
                <div className="xl:col-span-1 hidden xl:block relative">
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