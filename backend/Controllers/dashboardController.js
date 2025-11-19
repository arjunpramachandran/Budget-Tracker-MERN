const User = require('../Models/User');
const Expense = require('../Models/Expense');
const Income = require('../Models/Income');
const {isValidObjectId , Types} = require('mongoose');
// Get Dashboard Data
exports.getDashboardData = async (req, res) => {
    try {   
        const userId = req.user.id;
        const totalIncome = await Income.aggregate([
            { $match: { user: Types.ObjectId(userId) } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);
        const totalExpense = await Expense.aggregate([
            { $match: { user: Types.ObjectId(userId) } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);
        const incomeCount = await Income.countDocuments({ user: userId });
        const expenseCount = await Expense.countDocuments({ user: userId });    
        res.status(200).json({
            totalIncome: totalIncome[0] ? totalIncome[0].total : 0,
            totalExpense: totalExpense[0] ? totalExpense[0].total : 0,  
            incomeCount,
            expenseCount
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }   
};


exports.lastTransactions = async (req, res) => {
    try {
        const userId = req.user.id;
        const recentIncomes = await Income.find({ user: userId })
            .sort({ createdAt: -1 })
            .limit(5);
        const recentExpenses = await Expense.find({ user: userId })
            .sort({ createdAt: -1 })
            .limit(5);
        res.status(200).json({ recentIncomes, recentExpenses });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};  

