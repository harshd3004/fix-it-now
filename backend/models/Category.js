const {Schema, model} = require('mongoose');

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    }
}, {timestamps: true});

module.exports = model('Category', CategorySchema);