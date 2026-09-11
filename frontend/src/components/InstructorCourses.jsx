import { useState, useEffect } from 'react';
import api from '../utils/api';

const InstructorCourses = () => {
    const [courses, setCourses] = useState([]);
    const [enrolledStudents, setEnrolledStudents] = useState([]);
    const [selectedCourseId, setSelectedCourseId] = useState(null);


    useEffect(() => {
        const fetchMyCourses = async () => {
            try {
                const { data } = await api.get('/courses/instructor/my-courses');
                setCourses(data);
            } catch (error) {
                console.error('Error fetching courses', error);
            }
        };
        fetchMyCourses();
    }, []);


    const handleViewStudents = async (courseId) => {
        try {
            if (selectedCourseId === courseId) {
                setSelectedCourseId(null);
                return;
            }

            const { data } = await api.get(`/enrollments/course/${courseId}`);
            setEnrolledStudents(data);
            setSelectedCourseId(courseId);
        } catch (error) {
            console.error('Error fetching students', error);
        }
    };

    if (courses.length === 0) return <p>You have not posted any courses yet.</p>;

    return (
        <div style={{ marginTop: '20px' }}>
            <h3>📚 My Posted Courses</h3>
            
            {courses.map((course) => (
                <div key={course._id} style={{ border: '1px solid #aaa', padding: '15px', marginBottom: '15px', borderRadius: '5px' }}>
                    <h4>{course.title}</h4>
                    
                    <button 
                        onClick={() => handleViewStudents(course._id)}
                        style={{ padding: '8px 12px', background: '#333', color: 'white', cursor: 'pointer', border: 'none' }}
                    >
                        {selectedCourseId === course._id ? 'Hide Students' : 'View Enrolled Students'}
                    </button>

                    {selectedCourseId === course._id && (
                        <div style={{ marginTop: '15px', padding: '10px', background: '#f9f9f9', border: '1px solid #ddd' }}>
                            <h5>Enrolled Students: {enrolledStudents.length}</h5>
                            
                            {enrolledStudents.length > 0 ? (
                                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                    <thead>
                                        <tr style={{ background: '#ddd' }}>
                                            <th style={{ padding: '8px', borderBottom: '1px solid #ccc' }}>Name</th>
                                            <th style={{ padding: '8px', borderBottom: '1px solid #ccc' }}>Email</th>
                                            <th style={{ padding: '8px', borderBottom: '1px solid #ccc' }}>Enrolled Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {enrolledStudents.map((enrollment) => (
                                            <tr key={enrollment._id}>
                                                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{enrollment.student?.name}</td>
                                                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{enrollment.student?.email}</td>
                                                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{new Date(enrollment.createdAt).toLocaleDateString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p style={{ color: 'red' }}>No students have enrolled in this course yet.</p>
                            )}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default InstructorCourses;