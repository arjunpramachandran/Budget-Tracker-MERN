const express = require('express');
const {protect} = require('../Middlewares/authMiddle');
const { getDashboardData } = require('../Controllers/dashboardController');
const router = express.Router();
router.get('/data', protect, getDashboardData);

module.exports = router;