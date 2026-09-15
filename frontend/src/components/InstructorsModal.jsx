import { useState, useEffect } from 'react';
import api from '../utils/api';

const InstructorsModal = ({ onClose }) => {
    const [instructors, setInstructors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInstructors = async () => {
            try {
                const { data } = await api.get('/users/instructors');
                setInstructors(data);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch instructors');
            } finally {
                setLoading(false);
            }
        };

        fetchInstructors();
    }, []);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-fade-in">
            <div className="relative w-full max-w-5xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col p-8 md:p-12 scale-up max-h-[90vh]">
                <button 
                    onClick={onClose}
                    className="absolute top-6 right-6 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200 hover:text-red-500 transition-colors z-10"
                >
                    ✕
                </button>

                <h2 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight text-center">
                    Meet Our Instructors
                </h2>
                <p className="text-gray-500 text-center mb-8">
                    Learn from industry experts and passionate educators.
                </p>

                <div className="overflow-y-auto flex-1 pr-2 custom-scrollbar">
                    {loading ? (
                        <div className="flex justify-center items-center h-40 text-gray-500">
                            Loading instructors...
                        </div>
                    ) : error ? (
                        <div className="flex justify-center items-center h-40 text-red-500 bg-red-50 rounded-2xl p-4">
                            {error}
                        </div>
                    ) : instructors.length === 0 ? (
                        <div className="flex justify-center items-center h-40 text-gray-500">
                            No instructors available yet.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {instructors.map(instructor => (
                                <div key={instructor._id} className="bg-blue-50/50 p-6 rounded-3xl border border-blue-100 hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col items-center text-center">
                                    <div className="w-20 h-20 bg-gradient-to-tr from-primary to-accent rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-md">
                                        {instructor.name.charAt(0).toUpperCase()}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">{instructor.name}</h3>
                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{instructor.email}</p>
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
