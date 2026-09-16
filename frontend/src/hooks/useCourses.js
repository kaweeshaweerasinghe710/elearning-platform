import { useState, useEffect } from 'react';
import api from '../utils/api';

export const useCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true);
            try {
                const { data } = await api.get(`/courses?page=${page}&limit=5`);
                setCourses(data.courses || []);
                setTotalPages(data.pages || 1);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching courses:", err);
                setError(err);
                setLoading(false);
            }
        };
        fetchCourses();
    }, [page]);

    const enroll = async (courseId) => {
        try {
            await api.post('/enrollments', { courseId });
            return { success: true };
        } catch (err) {
            return { success: false, message: err.response?.data?.message || 'Failed to enroll' };
        }
    };

    return { courses, loading, error, enroll, page, setPage, totalPages };
};
