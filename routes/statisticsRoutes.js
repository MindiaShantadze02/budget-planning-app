// importing dependencies
const express = require('express');

// defining router
const router = express.Router();

// importing middlewares
const auth = require('../middleware/auth');

// importing controllers
const {
    getCategoryStatistics
} = require('../controllers/statisticsController');

router.post('/categories', auth, getCategoryStatistics);

module.exports = router;
