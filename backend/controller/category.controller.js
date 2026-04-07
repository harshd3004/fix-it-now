const Category = require('../models/Category');

const getAllCategories = async (req, res, next) => {
    try {
        const categories = await Category.find().select('name description imageIcon').sort({ name: 1 });
        res.json(categories);
    } catch (error) {
        next(error);
    }
} 

module.exports = {
    getAllCategories
}