const Bid = require('../models/Bid');
const Job = require('../models/Job');
const Notification = require('../models/Notification');

const placeBid = async (req, res, next) => {
    try {
        const { proposedPrice, estimatedCompletionDate, message } = req.body;
        const jobId = req.params.id;
        const technicianId = req.user._id;

        if( !jobId || !proposedPrice){
            res.status(400);
            throw new Error('Job ID and proposed price are required.');
        }
        
        const job = await Job.findById(jobId).select('title customer'); //we need the job title and customer id for the notification
        if (!job) {
            res.status(404);
            throw new Error('Job not found');
        }

        const bidData = {
            job: jobId,
            technician: technicianId,
            proposedPrice,
            estimatedCompletionDate,
            message
        }

        //check if user has already placed a bid on this job
        const existingBid = await Bid.findOne({ job: jobId, technician: technicianId });
        if(existingBid){
            res.status(400);
            throw new Error('You have already placed a bid on this job.');
        }

        await Bid.create(bidData);

        const notification = {
            user: job.customer,
            message: `New bid placed for job: '${job.title}'`,
            job: jobId
        }
        await Notification.create(notification);

        res.status(201).json({
            success: true,
            message: 'Bid placed successfully'
        });
    }
    catch(err){
        next(err);
    }
}

const getBidsForJob = async (req, res, next) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).select('customer');
        if(!job){
            res.status(404);
            throw new Error('Job not found');
        }
        //only the customer who posted the job can see the bids
        if(job.customer.toString() !== req.user._id.toString()){
            res.status(403);
            throw new Error('You are not authorized to view the bids for this job.');
        }

        const bids = await Bid.find({ job: jobId }).populate('technician', 'name email');

        res.status(200).json(bids);
    }
    catch(err){
        next(err);
    }
}

module.exports = {
    placeBid,
    getBidsForJob
}