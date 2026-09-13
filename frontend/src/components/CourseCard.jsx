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
            className={`bg-white rounded-[1.5rem] border overflow-hidden cursor-pointer transition-all ${
                isExpanded ? 'border-blue-400 shadow-xl' : 'border-gray-200 shadow-sm hover:shadow-md'
            }`}
        >
            <div className="bg-blue-50 p-6">
                <h4 className="text-xl font-extrabold text-gray-900">{course.title}</h4>
            </div>
            <div className="p-6">
                {!isExpanded && (
                    <p className="text-gray-500 text-sm line-clamp-2">
                        {course.description}
                    </p>
                )}

                {isExpanded && (
                    <div className="animate-fade-in">
                        <p className="text-gray-700 text-sm mb-6">{course.description}</p>
                        
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-6">
                            <h5 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">Content</h5>
                            <p className="text-sm text-gray-700 whitespace-pre-wrap">{course.content || 'No content provided.'}</p>
                        </div>
                        
                        <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                            <p className="text-sm font-bold text-gray-600">
                                 {course.instructor?.name || 'Unknown'}
                            </p>
                            
                            {user.role === 'student' && (
                                <button 
                                    onClick={handleEnrollClick} 
                                    className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-colors"
                                >
                                    Enroll Now
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <style>{`
                .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            `}</style>
        </div>
    );
};

export default CourseCard;
