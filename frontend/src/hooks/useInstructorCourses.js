import { useState, useEffect } from 'react';
import api from '../utils/api';

export const useInstructorCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCourses, setTotalCourses] = useState(0);

    useEffect(() => {
        const fetchMyCourses = async () => {
            setLoading(true);
            try {
                const { data } = await api.get(`/courses/instructor/my-courses?page=${page}&limit=5`);
                setCourses(data.courses || []);
                setTotalPages(data.pages || 1);
                setTotalCourses(data.total || 0);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching courses', error);
                setLoading(false);
            }
        };
        fetchMyCourses();
    }, [page]);

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

    return { courses, loading, handleDelete, handleUpdate, page, setPage, totalPages, totalCourses };
};
