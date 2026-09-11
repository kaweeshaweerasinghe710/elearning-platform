import { useState, useEffect, useContext } from 'react';
import api from '../utils/api'; 
import AuthContext from '../context/AuthContext';

const CourseList = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);


    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const { data } = await api.get('/courses');
                setCourses(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching courses:", error);
                setLoading(false);
            }
        };

        fetchCourses();
    }, []); 

 
    const handleEnroll = async (courseId) => {
        try {
            await api.post('/enrollments', { courseId });
            alert('Successfully enrolled in the course!');
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to enroll');
        }
    };
    
    if (loading) return <p>Loading courses...</p>;
    if (courses.length === 0) return <p>No courses available right now.</p>;


    return (
        <div>
            <h3 style={{ marginTop: '20px' }}>Available Courses</h3>
            <div style={{ display: 'grid', gap: '15px' }}>
                {courses.map((course) => (
                    <div key={course._id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '5px' }}>
                        <h4 style={{ margin: '0 0 10px 0' }}>{course.title}</h4>
                        <p style={{ margin: '0 0 10px 0' }}>{course.description}</p>
                        <small style={{ color: 'gray' }}>Instructor: {course.instructor?.name}</small>
                        <br />

                        {user.role === 'student' && (
                            <button 
                                onClick={() => handleEnroll(course._id)}
                                style={{ marginTop: '10px', padding: '8px 12px', background: 'blue', color: 'white', border: 'none', cursor: 'pointer' }}
                            >
                                Enroll Now
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CourseList;