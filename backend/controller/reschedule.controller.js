const RescheduleRequest = require('../models/RescheduleRequest');
const Job = require('../models/Job');
const Notification = require('../models/Notification');

const requestReschedule = async (req, res, next) => {
    try {
        const { proposedDate, reason } = req.body;
        const jobId = req.params.jobId;
        const technicianId = req.user._id;

        if (!jobId || !proposedDate) {
            res.status(400);
            throw new Error('Job ID and proposed date are required.');
        }

        const job = await Job.findById(jobId).select('technician customer prefferedDate');
        if (!job) {
            res.status(404);
            throw new Error('Job not found');
        }

        if (job.technician.toString() !== technicianId.toString()) {
            res.status(403);
            throw new Error('Only the assigned technician can request a reschedule.');
        }

        const existingRequest = await RescheduleRequest.findOne({
            job: jobId,
            status: 'pending'
        });
        if (existingRequest) {
            res.status(400);
            throw new Error('There is already a pending reschedule request for this job.');
        }

        const rescheduleData = {
            job: jobId,
            technician: technicianId,
            customer: job.customer,
            currentDate: job.prefferedDate,
            proposedDate,
            reason
        };

        const rescheduleRequest = await RescheduleRequest.create(rescheduleData);

        // Create notification for customer
        const jobTitle = await Job.findById(jobId).select('title');
        const notification = {
            user: job.customer,
            message: `Reschedule request for job: '${jobTitle.title}'`,
            job: jobId
        };
        await Notification.create(notification);

        res.status(201).json({
            success: true,
            message: 'Reschedule request created successfully',
            data: rescheduleRequest
        });
    } catch (err) {
        next(err);
    }
};

const getPendingRescheduleRequests = async (req, res, next) => {
    try {
        const jobId = req.params.jobId;

        const job = await Job.findById(jobId).select('customer technician');
        if (!job) {
            res.status(404);
            throw new Error('Job not found');
        }

        if (
            job.customer.toString() !== req.user._id.toString() &&
            job.technician.toString() !== req.user._id.toString()
        ) {
            res.status(403);
            throw new Error('Not authorized to view reschedule requests for this job.');
        }

        const filter = { job: jobId };
        if (job.customer.toString() === req.user._id.toString()) {
            filter.status = 'pending';
        }

        const rescheduleRequests = await RescheduleRequest.find(filter)
            .populate('technician', 'name email')
            .populate('customer', 'name email')
            .sort({ createdAt: -1 });

        res.status(200).json(rescheduleRequests);
    } catch (err) {
        next(err);
    }
};

const approveRescheduleRequest = async (req, res, next) => {
    try {
        const requestId = req.params.id;

        const rescheduleRequest = await RescheduleRequest.findById(requestId);
        if (!rescheduleRequest) {
            res.status(404);
            throw new Error('Reschedule request not found');
        }

        if (rescheduleRequest.customer.toString() !== req.user._id.toString()) {
            res.status(403);
            throw new Error('Only the customer can approve reschedule requests.');
        }

        if (rescheduleRequest.status !== 'pending') {
            res.status(400);
            throw new Error('Only pending reschedule requests can be approved.');
        }

        const job = await Job.findById(rescheduleRequest.job);
        job.prefferedDate = rescheduleRequest.proposedDate;
        await job.save();

        rescheduleRequest.status = 'approved';
        await rescheduleRequest.save();

        const notification = {
            user: rescheduleRequest.technician,
            message: `Your reschedule request for job has been approved`,
            job: rescheduleRequest.job
        };
        await Notification.create(notification);

        res.status(200).json({
            success: true,
            message: 'Reschedule request approved successfully',
            data: rescheduleRequest
        });
    } catch (err) {
        next(err);
    }
};

const rejectRescheduleRequest = async (req, res, next) => {
    try {
        const requestId = req.params.id;

        const rescheduleRequest = await RescheduleRequest.findById(requestId);
        if (!rescheduleRequest) {
            res.status(404);
            throw new Error('Reschedule request not found');
        }

        if (rescheduleRequest.customer.toString() !== req.user._id.toString()) {
            res.status(403);
            throw new Error('Only the customer can reject reschedule requests.');
        }

        if (rescheduleRequest.status !== 'pending') {
            res.status(400);
            throw new Error('Only pending reschedule requests can be rejected.');
        }

        const job = await Job.findById(rescheduleRequest.job);
        job.technician = null;
        job.status = 'open';
        await job.save();

        rescheduleRequest.status = 'rejected';
        await rescheduleRequest.save();

        const notification = {
            user: rescheduleRequest.technician,
            message: `Your reschedule request for job has been rejected. Job is now open for bids.`,
            job: rescheduleRequest.job
        };
        await Notification.create(notification);

        res.status(200).json({
            success: true,
            message: 'Reschedule request rejected successfully',
            data: rescheduleRequest
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    requestReschedule,
    getPendingRescheduleRequests,
    approveRescheduleRequest,
    rejectRescheduleRequest
};
