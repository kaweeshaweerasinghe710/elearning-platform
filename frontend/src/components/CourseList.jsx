import { useCourses } from '../hooks/useCourses';
import { useEnrollments } from '../hooks/useEnrollments';
import CourseCard from './CourseCard'; 
import CourseChatbot from './CourseChatbot';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CourseList = () => {
    const { courses, loading: coursesLoading, enroll, page, setPage, totalPages } = useCourses();
    const { enrollments } = useEnrollments();
  
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
        <div className="list-container">
            <div className="list-header">
                <h3 className="list-title">Explore Courses</h3>
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
            
            <CourseChatbot courses={courses} onEnroll={handleEnroll} />
        </div>
    );
};

export default CourseList;