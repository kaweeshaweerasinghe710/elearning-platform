const Course = require('../models/Course');
const aiService = require('../services/aiService');

const getRecommendations = async (req, res) => {
    try {
        const { messages } = req.body;
        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            return res.status(400).json({ message: 'A valid messages array is required' });
        }

        const allCourses = await Course.find({}).select('-modules'); 
        const aiResponse = await aiService.getAIRecommendations(messages, allCourses);

        res.status(200).json(aiResponse);

    } catch (error) {
        console.error('Error in chat controller:', error);
        res.status(500).json({ message: 'Server error processing AI request' });
    }
};

const getChatResponse = async (req, res) => {
    try {
        const { prompt } = req.body;
        if (!prompt || typeof prompt !== 'string' || prompt.trim() === '') {
            return res.status(400).json({ message: 'A valid text prompt is required' });
        }
        if (prompt.length > 500) {
            return res.status(400).json({ message: 'Prompt must be less than 500 characters' });
        }

        const aiResponse = await aiService.getAIChatResponse(prompt.trim());
        res.status(200).json(aiResponse);

    } catch (error) {
        console.error('Error in chat controller (chat):', error);
        res.status(500).json({ message: 'Server error processing AI chat request' });
    }
};

module.exports = {
    getRecommendations,
    getChatResponse
};
