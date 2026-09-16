import { useState, useEffect } from 'react';
import api from '../utils/api';

export const useEnrollments = () => {
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

    return { enrollments, loading };
};
