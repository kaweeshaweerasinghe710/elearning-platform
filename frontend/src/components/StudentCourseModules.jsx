import AccordionSection from './AccordionSection';

const StudentCourseModules = ({ weeks }) => {
    if (!weeks || weeks.length === 0) return null;

    return (
        <div className="mt-8 space-y-4">
            <h3 className="text-xl font-bold text-slate-800 border-b pb-2 mb-4">Course Content</h3>
            {weeks.map((week, index) => (
                <AccordionSection key={index} title={week.title || `Module ${index + 1}`} showCollapseAll={false}>
                    <div className="flex flex-col gap-5 p-1">
                        {week.announcement && (
                            <div className="p-3 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg text-sm text-slate-700">
                                <span className="font-bold block text-blue-800 mb-1">Important Announcement:</span>
                                {week.announcement}
                            </div>
                        )}
                        
                        {week.classLinks && week.classLinks.length > 0 && (
                            <div>
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Class Links</h4>
                                <div className="grid gap-2">
                                    {week.classLinks.map((link, lIdx) => (
                                        <a key={lIdx} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-lg hover:border-blue-400 hover:shadow-sm transition-all group">
                                            <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">🔗</span>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{link.title}</span>
                                                {link.date && <span className="text-xs text-slate-500">{new Date(link.date).toLocaleDateString()}</span>}
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}

                        {week.resources && week.resources.length > 0 && (
                            <div>
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Study Materials</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {week.resources.map((res, rIdx) => (
                                        <a key={rIdx} href={res.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-lg hover:border-emerald-400 hover:shadow-sm transition-all group">
                                            <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                                                {res.resourceType === 'video' ? '▶' : res.resourceType === 'pdf' ? '📄' : '📁'}
                                            </span>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">{res.title}</span>
                                                <span className="text-[10px] font-bold text-slate-400 uppercase">{res.resourceType}</span>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                        
                        {(!week.resources?.length && !week.classLinks?.length && !week.announcement) && (
                            <div className="text-sm text-slate-400 italic">No content uploaded for this module yet.</div>
                        )}
                    </div>
                </AccordionSection>
            ))}
        </div>
    );
};

export default StudentCourseModules;
