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

    if (loading) return <p className="text-gray-500 animate-pulse">Loading courses...</p>;
    if (courses.length === 0) return <p className="text-gray-500">No courses available right now.</p>;

    return (
        <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Available Courses</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                    <div key={course._id} className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition duration-300 flex flex-col justify-between">
                        <div>
                            <h4 className="text-lg font-bold text-gray-900 mb-2">{course.title}</h4>
                            <p className="text-gray-600 mb-4 line-clamp-3">{course.description}</p>
                            <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full mb-4">
                                Instructor: {course.instructor?.name}
                            </span>
                        </div>

                        {user.role === 'student' && (
                            <button 
                                onClick={() => handleEnroll(course._id)}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
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