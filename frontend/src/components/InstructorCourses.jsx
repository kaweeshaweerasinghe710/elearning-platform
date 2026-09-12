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

    if (courses.length === 0) return <p className="text-gray-500 italic">You have not posted any courses yet.</p>;

    return (
        <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">📚 My Posted Courses</h3>
            
            <div className="space-y-4">
                {courses.map((course) => (
                    <div key={course._id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                                <h4 className="text-lg font-bold text-gray-900">{course.title}</h4>
                                <p className="text-sm text-gray-500 truncate max-w-xl">{course.description}</p>
                            </div>
                            
                            <button 
                                onClick={() => handleViewStudents(course._id)}
                                className="whitespace-nowrap bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded transition duration-300"
                            >
                                {selectedCourseId === course._id ? 'Hide Students' : 'View Enrolled Students'}
                            </button>
                        </div>
                        {selectedCourseId === course._id && (
                            <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-md">
                                <h5 className="font-bold text-gray-700 mb-3">Enrolled Students: {enrolledStudents.length}</h5>
                                
                                {enrolledStudents.length > 0 ? (
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="bg-gray-200 text-gray-700">
                                                    <th className="p-3 border-b border-gray-300">Name</th>
                                                    <th className="p-3 border-b border-gray-300">Email</th>
                                                    <th className="p-3 border-b border-gray-300">Enrolled Date</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {enrolledStudents.map((enrollment) => (
                                                    <tr key={enrollment._id} className="hover:bg-gray-100 transition duration-150">
                                                        <td className="p-3 border-b border-gray-200 text-gray-800">{enrollment.student?.name}</td>
                                                        <td className="p-3 border-b border-gray-200 text-gray-600">{enrollment.student?.email}</td>
                                                        <td className="p-3 border-b border-gray-200 text-gray-500">{new Date(enrollment.createdAt).toLocaleDateString()}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <p className="text-red-500 italic">No students have enrolled in this course yet.</p>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InstructorCourses;