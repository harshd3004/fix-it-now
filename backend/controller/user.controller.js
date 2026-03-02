const User = require('../models/User');

const getUserProfile = async (req, res, next) => {
    try {
        const userId = req.params.id;
        if(!userId) {
            res.status(400)
            throw new Error('User ID is required');
        }
        const user = await User.findById(userId).populate('technicianProfile.skills').select('-password');
        
        if(userId === req.user._id.toString() || user.role === 'technician' || user.role === 'admin') {
            res.json(user);
        }else if(user.role === 'customer') {
            res.status(403);
            throw new Error('Access denied: You can only view your own or technician profile');
        }
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getUserProfile
}