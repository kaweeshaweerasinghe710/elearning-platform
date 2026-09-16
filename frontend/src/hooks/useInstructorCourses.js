import { useState, useEffect } from 'react';
import api from '../utils/api';

export const useInstructorCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMyCourses = async () => {
            try {
                const { data } = await api.get('/courses/instructor/my-courses');
                setCourses(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching courses', error);
                setLoading(false);
            }
        };
        fetchMyCourses();
    }, []);

    const handleDelete = async (courseId) => {
        if (window.confirm("Are you sure you want to delete this course?")) {
            try {
                await api.delete(`/courses/${courseId}`);
                setCourses(courses.filter(c => c._id !== courseId));
                return { success: true };
            } catch (error) {
                console.error("Failed to delete course", error);
                return { success: false, message: "Failed to delete course" };
            }
        }
        return { success: false, cancelled: true };
    };

    const handleUpdate = (updatedCourse) => {
        setCourses(courses.map(c => c._id === updatedCourse._id ? updatedCourse : c));
    };

    return { courses, loading, handleDelete, handleUpdate };
};
