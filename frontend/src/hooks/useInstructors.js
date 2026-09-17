import { useState, useEffect } from 'react';
import api from '../utils/api';

export const useInstructors = () => {
    const [instructors, setInstructors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInstructors = async () => {
            try {
                const { data } = await api.get('/users/instructors');
                setInstructors(data);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch instructors');
            } finally {
                setLoading(false);
            }
        };

        fetchInstructors();
    }, []);

    return { instructors, loading, error };
};
