import { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';

const CourseCard = ({ course, onEnroll }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { user } = useContext(AuthContext);

    const handleEnrollClick = (e) => {
        e.stopPropagation(); 
        onEnroll(course._id);
    };

    return (
        <div 
            onClick={() => setIsExpanded(!isExpanded)}
            className={`course-card ${isExpanded ? 'course-card-expanded' : 'course-card-collapsed'}`}
        >
            <div className="course-card-header">
                <h4 className="course-card-title">{course.title}</h4>
            </div>
            
            <div className="course-card-body">
                {!isExpanded && (
                    <p className="course-card-desc">
                        {course.description}
                    </p>
                )}

                {isExpanded && (
                    <div>
                        <p className="course-card-desc-full">{course.description}</p>
                        
                        <div className="course-overview-box">
                            <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Overview</h5>
                            <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">{course.content || 'No detailed overview provided.'}</p>
                        </div>
                        
                        <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100">
                            <div className="flex items-center gap-2">
                                <div className="nav-avatar w-8 h-8 text-xs bg-indigo-50 text-indigo-600">
                                    {course.instructor?.name?.charAt(0) || 'I'}
                                </div>
                                <p className="text-sm font-medium text-slate-600">
                                    {course.instructor?.name || 'Unknown'}
                                </p>
                            </div>
                            
                            {user.role === 'student' && (
                                <button 
                                    onClick={handleEnrollClick} 
                                    className="btn-primary ml-auto"
                                >
                                    Enroll
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CourseCard;
