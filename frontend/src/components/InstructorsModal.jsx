import { useInstructors } from '../hooks/useInstructors';

const InstructorsModal = ({ onClose }) => {
    const { instructors, loading, error } = useInstructors();

    return (
        <div className="modal-overlay animate-fade-in">
            <div className="modal-window scale-up">
                <button onClick={onClose} className="modal-close-btn">✕</button>

                <h2 className="text-4xl font-extrabold text-slate-900 mb-2 tracking-tight text-center">
                    Meet Our Instructors
                </h2>
                <p className="text-slate-500 text-center mb-8">
                    Learn from industry experts and passionate educators.
                </p>

                <div className="overflow-y-auto flex-1 pr-2 custom-scrollbar">
                    {loading ? (
                        <div className="flex justify-center items-center h-40 text-slate-500">
                            Loading instructors...
                        </div>
                    ) : error ? (
                        <div className="flex justify-center items-center h-40 text-red-500 bg-red-50 rounded-2xl p-4">
                            {error}
                        </div>
                    ) : instructors.length === 0 ? (
                        <div className="flex justify-center items-center h-40 text-slate-500">
                            No instructors available yet.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {instructors.map(instructor => (
                                <div key={instructor._id} className="bg-blue-50/50 p-6 rounded-3xl border border-blue-100 hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col items-center text-center">
                                    <div className="w-20 h-20 bg-gradient-to-tr from-primary to-accent rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-md">
                                        {instructor.name.charAt(0).toUpperCase()}
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-1">{instructor.name}</h3>
                                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{instructor.email}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            
        </div>
    );
};

export default InstructorsModal;
