const extractCategory = (title) => {
    if (!title) return 'General';
    return title.includes('-') ? title.split('-')[0].trim() : 'General';
};

const getBgClass = (id = '') => {
    const charCodeSum = id.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    return `ic-card-bg-${charCodeSum % 6}`;
};

const EnrollmentCard = ({ enrollment, onSelect, onUnenroll }) => {
    return (
        <div 
            onClick={() => onSelect(enrollment.course)}
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
                        onClick={(e) => {
                            e.stopPropagation();
                            onUnenroll(enrollment.course?._id);
                        }}
                        className="text-red-500 hover:text-red-700 text-xs px-2 py-1 rounded bg-red-50 hover:bg-red-100 transition-colors"
                    >
                        Unenroll
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EnrollmentCard;
