const Category = require('../models/Category');

const getAllCategories = async (req, res, next) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        next(error);
    }
} 

module.exports = {
    getAllCategories
}