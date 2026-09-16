import { useState } from 'react';
import { useEnrollments } from '../hooks/useEnrollments';
import EnrolledCourseDetail from './EnrolledCourseDetail';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const extractCategory = (title) => {
    if (!title) return 'General';
    return title.includes('-') ? title.split('-')[0].trim() : 'General';
};

const getBgClass = (id = '') => {
    const charCodeSum = id.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    return `ic-card-bg-${charCodeSum % 6}`;
};

const MyEnrollments = () => {
    const { enrollments, loading, page, setPage, totalPages, unenroll } = useEnrollments();
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [message, setMessage] = useState(null);


    if (loading && enrollments.length === 0) return <div className="text-center py-20 text-gray-500 font-medium text-sm">Loading your enrollments...</div>;
    
    if (selectedCourse) {
        return <EnrolledCourseDetail course={selectedCourse} onBack={() => setSelectedCourse(null)} />;
    }

    return (
        <div>
            {message && (
                <div className={`mb-4 text-[13px] font-bold ${message.type === 'success' ? 'text-emerald-600' : 'text-red-600'}`}>
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
                            <div 
                                key={enrollment._id} 
                                onClick={() => setSelectedCourse(enrollment.course)}
                                className="ic-card group cursor-pointer"
                            >
                                <div className={`ic-card-banner bg-gradient-to-br ${getBgClass(enrollment.course?._id || '')}`}>
                                    <div className="ic-card-pattern"></div>
                                    <div className="absolute top-3 left-3 bg-[#0a1128]/80 backdrop-blur-sm text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-sm border border-white/10">
                                        {extractCategory(enrollment.course?.title)}
                                    </div>
                                </div>
                                
                                <div className="ic-card-content flex flex-col p-4 bg-white relative h-full">
                                    <h4 className="text-[14px] font-medium text-foreground leading-snug mb-3">
                                        {enrollment.course?.title}
                                    </h4>
                                    
                                    <p className="text-sm text-slate-600 line-clamp-3 mb-4 flex-1">
                                        {enrollment.course?.description}
                                    </p>
                                    
                                    <div className="mt-auto pt-4 border-t border-slate-100 flex justify-between items-center text-sm font-semibold group-hover:text-primary-hover transition-colors">
                                        <span className="text-primary flex items-center gap-1">Continue <span className="transform group-hover:translate-x-1 transition-transform">&rarr;</span></span>
                                        <button 
                                            onClick={async (e) => {
                                                e.stopPropagation();
                                                const result = await unenroll(enrollment.course?._id);
                                                if (result.success) {
                                                    setMessage({ type: 'success', text: 'Successfully unenrolled' });
                                                    window.dispatchEvent(new Event('syncEnrollments'));
                                                    setTimeout(() => setMessage(null), 3000);
                                                } else {
                                                    setMessage({ type: 'error', text: result.message });
                                                    setTimeout(() => setMessage(null), 3000);
                                                }
                                            }}
                                            className="text-red-500 hover:text-red-700 text-xs px-2 py-1 rounded bg-red-50 hover:bg-red-100 transition-colors"
                                        >
                                            Unenroll
                                        </button>
                                    </div>
                                </div>
                            </div>
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

export default MyEnrollments;