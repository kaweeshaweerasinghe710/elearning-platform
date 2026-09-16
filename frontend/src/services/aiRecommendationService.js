import api from '../utils/api';

export const getAIRecommendations = async (messages) => {
    try {
        const response = await api.post('/chat/recommend', { messages });
        return response.data; 
    } catch (error) {
        console.error('Failed to fetch AI recommendations from backend', error);
        throw error;
    }
};

export const sendChatMessage = async (prompt) => {
    try {
        const response = await api.post('/chat/ask', { prompt });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch AI chat response', error);
        throw error;
    }
};
