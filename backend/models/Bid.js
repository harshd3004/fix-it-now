const {Schema, model} = require('mongoose');

const BidSchema = new Schema({
    job : {
        type: Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    technician : {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    proposedPrice: {
        type: Number,
        required: true
    },
    estimatedCompletionDate: {
        type: Date
    },

    message: {
        type: String,
        trim: true
    },

    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    },

}, {timestamps: true})

BidSchema.index({ job: 1, technician: 1 }, { unique: true });

module.exports = model('Bid', BidSchema);