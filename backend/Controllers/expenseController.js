
const Income = require('../Models/Income');
const Expense = require('../Models/Expense');

// Add Expense
exports.addExpense = async (req, res) => {
    try {   
        const { amount, category  } = req.body;
        const { date } = req.body;
        if (!amount || !category ) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }   
        const expense = new Expense({   
            user: req.user.id,  
            amount,
            category,   
            date: date ? new Date(date) : Date.now()
        }); 
        await expense.save();
        res.status(201).json({ message: 'Expense added successfully', expense });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }   
};  

// Get Expenses
exports.getExpenses = async (req, res) => {
    try {   
        const expenses = await Expense.find({ user: req.user.id }).sort({ createdAt: -1 });

        res.status(200).json(expenses);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }

};
// Delete Expense
exports.deleteExpense = async (req, res) => {
    const expenseId = req.params.id;
    try {   
        const expense = await Expense.findById(expenseId);     
       
        if (!expense) { 
            return res.status(404).json({ message: 'Expense not found' });
        }   
        if (expense.user.toString() !== req.user.id) {  

            return res.status(401).json({ message: 'Unauthorized' });
        }
        await Expense.findByIdAndDelete(expenseId);
        res.status(200).json({ message: 'Expense deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};


