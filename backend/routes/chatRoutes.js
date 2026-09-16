const express = require('express');
const { getRecommendations, getChatResponse } = require('../controllers/chatController');

const router = express.Router();

router.post('/recommend', getRecommendations);
router.post('/ask', getChatResponse);

module.exports = router;
