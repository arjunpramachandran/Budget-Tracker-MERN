const User = require('../Models/User');
const Income = require('../Models/Income');


// Add Income
exports.addIncome = async (req, res) => {
    try {   
        const { amount, source } = req.body;
        const { date } = req.body;

        if (!amount || !source) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }
        
        
        const income = new Income({
            user: req.user.id,  
            amount,
            source,
            date: date ? new Date(date) : Date.now()
        });
        await income.save();
        res.status(201).json({ message: 'Income added successfully', income });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }   
};

// Get Incomes
exports.getIncomes = async (req, res) => {
    try {   
        const incomes = await Income.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(incomes);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }       
};

// Delete Income
exports.deleteIncome = async (req, res) => {
   
    const incomeId = req.params.id;
    try {   
        const income = await Income.findById(incomeId);     
        console.log(income);
           
        if (!income) {
            return res.status(404).json({ message: 'Income not found' });
        }   
        if (income.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Unauthorized' });
        }       
        await Income.findByIdAndDelete(incomeId);
        res.status(200).json({ message: 'Income deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }       
};
