const { Schema, model } = require('mongoose');

const statusRequestSchema = new Schema({

    job: {
        type: Schema.Types.ObjectId,
        ref: 'Job',
        required: true,
        unique: true
    },

    fromStatus : {
        type: String,
        enum: ['assigned', 'in-progress', 'completed', 'cancelled']
    },
    toStatus : {
        type: String,
        enum: ['in-progress', 'completed', 'cancelled']
    },
    status : {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    }
}, {timestamps:true});

module.exports = model('StatusRequest', statusRequestSchema);