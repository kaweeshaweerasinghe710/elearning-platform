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

    if (loading) return <p>Loading your courses...</p>;
    if (enrollments.length === 0) return <p style={{ color: 'gray' }}>You have not enrolled in any courses yet.</p>;

    return (
        <div style={{ marginTop: '20px', padding: '20px', background: '#f4f9f4', border: '1px solid #c3e6cb', borderRadius: '5px' }}>
            <h3 style={{ color: 'green', marginTop: 0 }}>✅ My Enrolled Courses</h3>
            <ul style={{ paddingLeft: '20px' }}>
                {enrollments.map((enrollment) => (
                    <li key={enrollment._id} style={{ marginBottom: '10px' }}>
                        <strong>{enrollment.course?.title}</strong> 
                        <br />
                        <small>{enrollment.course?.description}</small>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MyEnrollments;