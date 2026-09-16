import { useState, useEffect } from 'react';
import api from '../utils/api';

export const useEnrollments = () => {
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchMyEnrollments = async () => {
            setLoading(true);
            try {
                const { data } = await api.get(`/enrollments/my-enrollments?page=${page}&limit=5`);
                setEnrollments(data.enrollments || []);
                setTotalPages(data.pages || 1);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching enrollments", error);
                setLoading(false);
            }
        };
        fetchMyEnrollments();
    }, [page]);

    return { enrollments, loading, page, setPage, totalPages };
};
