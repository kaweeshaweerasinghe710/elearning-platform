import { useState, useEffect } from 'react';
import api from '../utils/api';
import CourseCard from './CourseCard'; // Imported the separated component

const CourseList = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
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
            alert('Successfully enrolled in the course! 🎉');
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to enroll');
        }
    };

    if (loading) return <div className="text-center py-20 text-gray-500 font-bold">Loading courses...</div>;
    if (courses.length === 0) return <div className="text-center py-20 text-gray-500 font-bold">No courses available.</div>;

    return (
        <div>
            <h3 className="text-2xl font-black text-gray-800 tracking-tight mb-8">📚 Explore Courses</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                    <CourseCard 
                        key={course._id} 
                        course={course} 
                        onEnroll={handleEnroll} 
                    />
                ))}
            </div>
        </div>
    );
};

export default CourseList;