const express = require('express');
const router = express.Router();
const ChatbotController = require('../controllers/chatbot.controller');

router.post('/conversar', ChatbotController.conversar);

module.exports = router;