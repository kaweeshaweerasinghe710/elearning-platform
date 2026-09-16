import { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';

const extractCategory = (title) => {
    return title.includes('-') ? title.split('-')[0].trim() : 'General';
};

const getBgClass = (id = '') => {
    const charCodeSum = id.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    return `ic-card-bg-${charCodeSum % 6}`;
};

const CourseCard = ({ course, onEnroll, isEnrolled }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { user } = useContext(AuthContext);

    const handleEnrollClick = (e) => {
        e.stopPropagation(); 
        onEnroll(course._id);
    };

    const category = extractCategory(course.title);

    return (
        <div 
            onClick={() => setIsExpanded(!isExpanded)}
            className="ic-card group cursor-pointer"
        >
            <div className={`ic-card-banner bg-gradient-to-br ${getBgClass(course._id)}`}>
                <div className="ic-card-pattern"></div>
                <div className="absolute top-3 left-3 bg-[#0a1128]/80 backdrop-blur-sm text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-sm border border-white/10">
                    {category}
                </div>
            </div>
            
            <div className="ic-card-content flex flex-col p-4 bg-white relative">
                <h4 className="text-[14px] font-medium text-[#1e1b4b] leading-snug mb-3">
                    {course.title}
                </h4>
                
                {isExpanded && (
                    <div className="mt-2 text-sm text-slate-600 border-t border-slate-100 pt-3">
                        <p className="mb-3">{course.description}</p>
                        
                        {course.content && (
                            <div className="mb-4">
                                <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Overview</h5>
                                <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">{course.content}</p>
                            </div>
                        )}
                    </div>
                )}
                
                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-[10px] font-bold shrink-0">
                            {course.instructor?.name?.charAt(0) || 'I'}
                        </div>
                        <span className="text-xs font-semibold text-slate-500 truncate max-w-[100px]">
                            {course.instructor?.name || 'Unknown'}
                        </span>
                    </div>

                    {user?.role === 'student' && onEnroll && (
                        isEnrolled ? (
                            <button 
                                disabled
                                className="text-sm font-bold text-blue-500 flex items-center gap-1.5 z-10 cursor-not-allowed opacity-70"
                            >
                                 Enrolled
                            </button>
                        ) : (
                            <button 
                                onClick={handleEnrollClick} 
                                className="text-sm font-bold text-blue-500 hover:text-blue-600 transition-colors flex items-center gap-1.5 z-10"
                            >
                                Enroll
                            </button>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default CourseCard;
