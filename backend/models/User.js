const { Schema, model, default: mongoose } = require('mongoose');

const UserSchema = new Schema({
    name : {
        type: String,
        required: true,
        trim: true
    },
    email : {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password : {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['customer', 'technician', 'admin'],
        default: 'customer'
    },

    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },

    //technician specific fields
    skills: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }],
    expirenceYears: {
        type: Number,
        default: 0
    },
    ratingAverage: {
        type: Number,
        default: 0
    },
    ratingCount: {
        type: Number,
        default: 0
    },
    jobCount: {
        type: Number,
        default: 0
    },
    isVerified: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });

module.exports = model('User', UserSchema);
