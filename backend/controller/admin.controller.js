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

const getPendingTechnicians = async (req, res, next) => {
    try {
        const technicians = await User.find({
            role: 'technician',
            'technicianProfile.isVerified': false
        })
            .populate('technicianProfile.skills', 'name')
            .select('-password')
            .sort({ createdAt: -1 });

        res.json(technicians);
    } catch (error) {
        next(error);
    }
};

const approveTechnicianVerification = async (req, res, next) => {
    try {
        const technicianId = req.params.id;

        const technician = await User.findById(technicianId);
        if (!technician) {
            res.status(404);
            throw new Error('Technician not found');
        }

        if (technician.role !== 'technician') {
            res.status(400);
            throw new Error('User is not a technician');
        }

        if (technician.technicianProfile.isVerified) {
            res.status(400);
            throw new Error('Technician is already verified');
        }

        technician.technicianProfile.isVerified = true;
        await technician.save();

        res.json({
            success: true,
            message: `Technician ${technician.name} has been verified successfully`
        });
    } catch (error) {
        next(error);
    }
};

const rejectTechnicianVerification = async (req, res, next) => {
    try {
        const technicianId = req.params.id;

        const technician = await User.findById(technicianId);
        if (!technician) {
            res.status(404);
            throw new Error('Technician not found');
        }

        if (technician.role !== 'technician') {
            res.status(400);
            throw new Error('User is not a technician');
        }

        if (technician.technicianProfile.isVerified) {
            res.status(400);
            throw new Error('Technician is already verified');
        }

        // For now, we'll just send a rejection message. In a production app,
        // you might want to store rejection reasons or send notifications.
        res.json({
            success: true,
            message: `Technician ${technician.name} verification has been rejected`
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getDashboardStats,
    getPendingTechnicians,
    approveTechnicianVerification,
    rejectTechnicianVerification
};
