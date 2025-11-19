const User = require('../Models/User');
const Category = require('../Models/Catagory');
const { isValidObjectId } = require('mongoose');

//create catogery by User
exports.createCategory = async (req, res) => {
    try {
        const { name, type, limit , color} = req.body; 
        if (!name || !type || !limit) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }
        const category = new Category({
            user: req.user.id,
            name,
            type,
            color,
            limit: limit
        });
        await category.save();
        res.status(201).json({ message: 'Category created successfully', category });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}

//get catogery by User
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(categories);
    }

    catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }       
};
//delete catogery by User
exports.deleteCategory = async (req, res) => {
    const categoryId = req.params.id;
    try {
        const category = await Category.findById(categoryId);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }       
        if (category.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Unauthorized' });
        }   
        await Category.findByIdAndDelete(categoryId);
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }       
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, type, color, limit } = req.body;

    const category = await Category.findOne({ _id: id, user: req.user.id });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    category.name = name ?? category.name;
    category.type = type ?? category.type;
    category.color = color ?? category.color;
    category.limit = limit ?? category.limit;

    await category.save();

    res.status(200).json({
      message: "Category updated successfully",
      category
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};