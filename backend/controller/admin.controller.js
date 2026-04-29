const User = require('../models/User');
const Job = require('../models/Job');

const getDashboardStats = async (req, res, next) => {
    try {
        const [
            totalUsers,
            totalTechnicians,
            totalJobs,
            activeJobs,
            completedJobs,
            pendingTechnicianVerifications
        ] = await Promise.all([
            User.countDocuments({}),
            User.countDocuments({ role: 'technician' }),
            Job.countDocuments({}),
            Job.countDocuments({ status: { $in: ['open', 'in-progress', 'in_progress'] } }),
            Job.countDocuments({ status: 'completed' }),
            User.countDocuments({
                role: 'technician',
                'technicianProfile.isVerified': false
            })
        ]);

        res.json({
            totalUsers,
            totalTechnicians,
            totalJobs,
            activeJobs,
            completedJobs,
            pendingTechnicianVerifications
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getDashboardStats
};
