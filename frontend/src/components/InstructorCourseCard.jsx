import { useState } from 'react';
import api from '../utils/api';
import { Edit2, Trash2, Users } from 'lucide-react';
import InstructorCourseStudents from './InstructorCourseStudents';
const extractCategory = (title) => {
    const parts = title.split('-');
    return parts.length > 1 ? parts[0].trim() : 'General';
};

const getBgClass = (id = '') => {
    const charCodeSum = id.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    return `ic-card-bg-${charCodeSum % 6}`;
};

const InstructorCourseCard = ({ course, onDelete, onEdit }) => {
    const [showStudents, setShowStudents] = useState(false);
    const [enrolledStudents, setEnrolledStudents] = useState([]);
    const [loadingStudents, setLoadingStudents] = useState(false);

    const handleViewStudents = async () => {
        if (showStudents) { setShowStudents(false); return; }
        setLoadingStudents(true);
        try {
            const { data } = await api.get(`/enrollments/course/${course._id}`);
            setEnrolledStudents(data);
            setShowStudents(true);
        } catch (error) { 
            console.error('Error fetching students', error); 
        } finally {
            setLoadingStudents(false);
        }
    };

    const category = extractCategory(course.title);
    const displayTitle = course.title; 

    return (
        <div className="ic-card group">
            <div className={`ic-card-banner bg-gradient-to-br ${getBgClass(course._id)}`}>
                <div className="ic-card-pattern"></div>
                <div className="absolute top-3 left-3 bg-[#0a1128]/80 backdrop-blur-sm text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-sm border border-white/10">
                    {category}
                </div>

                <div className="absolute top-3 right-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button onClick={onEdit} className="ic-banner-btn ic-banner-edit" title="Edit Course">
                        <Edit2 size={15} />
                    </button>
                    <button onClick={() => onDelete(course._id)} className="ic-banner-btn ic-banner-delete" title="Delete Course">
                        <Trash2 size={15} />
                    </button>
                </div>
            </div>

            <div className="ic-card-content">
                <h4 className="ic-card-title">{displayTitle}</h4>
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs font-semibold text-slate-500">
                        <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Live</span>
                    </div>
                    <button onClick={handleViewStudents} disabled={loadingStudents} className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1.5">
                        <Users size={16} /> 
                        {loadingStudents ? 'Loading...' : (showStudents ? 'Hide Students' : 'View Students')}
                    </button>
                </div>
            </div>

            {showStudents && <InstructorCourseStudents enrolledStudents={enrolledStudents} />}
        </div>
    );
};

export default InstructorCourseCard;
