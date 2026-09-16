import { useState, useEffect } from 'react';
import api from '../utils/api';

export const useCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const { data } = await api.get('/courses');
                setCourses(data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching courses:", err);
                setError(err);
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    const enroll = async (courseId) => {
        try {
            await api.post('/enrollments', { courseId });
            return { success: true };
        } catch (err) {
            return { success: false, message: err.response?.data?.message || 'Failed to enroll' };
        }
    };

    return { courses, loading, error, enroll };
};
