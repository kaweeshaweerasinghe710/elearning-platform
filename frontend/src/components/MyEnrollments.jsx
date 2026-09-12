import { useState, useEffect } from 'react';
import api from '../utils/api';

const MyEnrollments = () => {
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMyEnrollments = async () => {
            try {
                const { data } = await api.get('/enrollments/my-enrollments');
                setEnrollments(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching enrollments", error);
                setLoading(false);
            }
        };
        fetchMyEnrollments();
    }, []);

    if (loading) return <p className="text-gray-500 animate-pulse">Loading your courses...</p>;
    if (enrollments.length === 0) return <p className="text-gray-500 italic">You have not enrolled in any courses yet.</p>;

    return (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
                ✅ My Enrolled Courses
            </h3>
            <ul className="space-y-4">
                {enrollments.map((enrollment) => (
                    <li key={enrollment._id} className="bg-white border border-green-100 p-4 rounded-md shadow-sm">
                        <h4 className="text-lg font-bold text-gray-800">{enrollment.course?.title}</h4>
                        <p className="text-gray-600 text-sm mt-1">{enrollment.course?.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MyEnrollments;