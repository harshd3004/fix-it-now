const {Schema, model} = require('mongoose');

const NotificationSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    job: {
        type: Schema.Types.ObjectId,
        ref: 'Job'
    },
    isRead: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

module.exports = model('Notification', NotificationSchema);