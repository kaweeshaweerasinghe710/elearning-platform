const express = require('express');
const { getRecommendations, getGeneralChat } = require('../controllers/chatController');

const router = express.Router();

router.post('/recommend', getRecommendations);
router.post('/ask', getGeneralChat);

module.exports = router;
