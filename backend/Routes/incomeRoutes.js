const express = require('express');
const { addIncome, getIncomes, deleteIncome } = require('../Controllers/incomeController');
const { protect } = require('../Middlewares/authMiddle');
const router = express.Router();

router.post('/addincome', protect, addIncome);
router.get('/getIncome', protect, getIncomes);
router.delete('/delete/:id', protect, deleteIncome);

module.exports = router;