const mongoose = require('mongoose');

const rescheduleRequestSchema = new mongoose.Schema(
    {
        job: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Job',
            required: true
        },
        technician: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        currentDate: {
            type: Date,
            required: true
        },
        proposedDate: {
            type: Date,
            required: true
        },
        reason: {
            type: String,
            default: ''
        },
        status: {
            type: String,
            enum: ['pending', 'approved', 'rejected'],
            default: 'pending'
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('RescheduleRequest', rescheduleRequestSchema);
