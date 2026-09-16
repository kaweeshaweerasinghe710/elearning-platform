const Course = require('../models/Course');
const aiService = require('../services/aiService');

const getRecommendations = async (req, res) => {
    try {
        const { prompt } = req.body;
        if (!prompt || typeof prompt !== 'string' || prompt.trim() === '') {
            return res.status(400).json({ message: 'A valid text prompt is required' });
        }
        if (prompt.length > 500) {
            return res.status(400).json({ message: 'Prompt must be less than 500 characters' });
        }

        const allCourses = await Course.find({}).select('-modules'); 
        const aiResponse = await aiService.getAIRecommendations(prompt.trim(), allCourses);

        res.status(200).json(aiResponse);

    } catch (error) {
        console.error('Error in chat controller:', error);
        res.status(500).json({ message: 'Server error processing AI request' });
    }
};

module.exports = {
    getRecommendations
};
