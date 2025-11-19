const jwt = require('jsonwebtoken');
const User = require('../Models/User');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '3h',
    });
}
const registerUser = async (req, res) => {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }
    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({
            fullName,
            email,
            password,
        });

        if (user) {
            res.status(201).json({
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Server error',error: err.message });
    }
}
const loginUser = async (req, res) => {
    const { email, password } = req.body;   
    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }   
    try {
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) { 
            res.json({
                id: user._id,
                fullName: user.fullName,    
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }   
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }   
}

const getUserInfo = async (req, res) => {
    
    
    try{
        const user = await User.findById(req.user.id).select('-password');
        if(user){
            res.status(200).json(user);
        }else{
            res.status(404).json({message: 'User not found'});
        }   
    }catch(err){
        res.status(500).json({ message: 'Server error', error: err.message });  
    }

}

module.exports = { registerUser, loginUser, getUserInfo };