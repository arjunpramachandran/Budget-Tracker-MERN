const express = require('express');
const { registerUser, loginUser , getUserInfo} = require('../Controllers/AuthController');
const { protect } = require('../Middlewares/authMiddle');
const router = express.Router();    
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getUserInfo);

module.exports = router;        