const Notification = require('../models/Notification');

const getNotifications = async (req, res, next) => {
    try {
        const notifications = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(notifications);
    } catch (error) {
        next(error);
    }
};

const markAsRead = async (req, res, next) => {
    try {
        const notification = await Notification.findOne({ _id: req.params.id, user: req.user._id });
        if (!notification) {
            res.status(404);
            throw new Error("Notification not found");
        }
        notification.isRead = true;
        await notification.save();
        res.json(notification);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getNotifications,
    markAsRead
}
