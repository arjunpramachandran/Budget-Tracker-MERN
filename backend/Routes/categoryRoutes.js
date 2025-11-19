const express = require('express');
const {protect} = require('../Middlewares/authMiddle');
const {createCategory, getCategories,deleteCategory} = require('../Controllers/CategoryController');
const router = express.Router();
router.put('/create', protect, createCategory);
router.get('/get', protect, getCategories);
router.delete('/delete/:id', protect, deleteCategory);
router.put('/update/:id', protect, updateCategory);

module.exports = router;