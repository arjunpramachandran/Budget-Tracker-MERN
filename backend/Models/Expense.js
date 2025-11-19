const moongoose = require('mongoose');

const ExpenseSchema = new moongoose.Schema({    
    user: { 
        type: moongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,           
        required: true
    },      

    category: {
        type: String,
        required: true
    },      
    date: { 
        type: Date,     
        default: Date.now
    }   
}, { timestamps: true });   
module.exports = moongoose.model('Expense', ExpenseSchema);