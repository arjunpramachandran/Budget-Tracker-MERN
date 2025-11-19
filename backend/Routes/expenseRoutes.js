const express = require('express');
const { addExpense,getExpenses,deleteExpense } = require('../Controllers/expenseController');
const { protect } = require('../Middlewares/authMiddle');
const router = express.Router();

router.post('/addexpense', protect, addExpense);
router.get('/getExpenses', protect, getExpenses);
router.delete('/delete/:id', protect, deleteExpense);
module.exports = router;