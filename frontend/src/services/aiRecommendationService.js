import api from '../utils/api';

export const getAIRecommendations = async (prompt) => {
    try {
        const response = await api.post('/chat/recommend', { prompt });
        return response.data; 
    } catch (error) {
        console.error('Failed to fetch AI recommendations from backend', error);
        throw error;
    }
};
