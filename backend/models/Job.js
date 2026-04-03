const {Schema, model} = require('mongoose');

const JobSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    technician: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    images: [{
        type: String
    }],
    prefferedDate: {
        type: Date
    },
    status: {
        type: String,
        enum: ['open', 'assigned', 'in-progress', 'completed', 'cancelled'],
        default: 'open'
    },

    completionDate: {
        type: Date
    }
}, {timestamps: true})

module.exports = model('Job', JobSchema);