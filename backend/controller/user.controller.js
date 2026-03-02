const User = require('../models/User');
const mongoose = require('mongoose');

const getUserProfile = async (req, res, next) => {
    try {
        const userId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            res.status(400);
            throw new Error('Invalid user ID');
        }
        const user = await User.findById(userId).populate('technicianProfile.skills').select('-password');

        if(!user) {
            res.status(404)
            throw new Error('User not found');
        }
        
        //check if the requesting user can view this profile
        if(user._id.equals(req.user._id) || user.role === 'technician' || req.user.role === 'admin') {
            res.json(user);
        } else {
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