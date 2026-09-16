const Course = require('../models/Course');
const advisorAiService = require('../services/ai/advisorAiService');
const chatAiService = require('../services/ai/chatAiService');

const getRecommendations = async (req, res) => {
    try {
        const { messages } = req.body;
        if (!messages || !Array.isArray(messages)) {
            return res.status(400).json({ message: 'Invalid messages array' });
        }
        const allCourses = await Course.find({});
        const aiResponse = await advisorAiService.getAIRecommendations(messages, allCourses);
        res.json(aiResponse);
    } catch (error) {
        console.error('Advisor Error:', error);
        res.status(500).json({ message: 'Failed to get recommendations' });
    }
};

const getGeneralChat = async (req, res) => {
    try {
        const { prompt } = req.body;
        if (!prompt) {
            return res.status(400).json({ message: 'Prompt is required' });
        }
        
        const aiResponse = await chatAiService.getAIChatResponse(prompt.trim());
        res.json(aiResponse);
    } catch (error) {
        console.error('Chat Error:', error);
        res.status(500).json({ message: 'Failed to get chat response' });
    }
};

module.exports = {
    getRecommendations,
    getGeneralChat
};
