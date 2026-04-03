const Job = require("../models/Job");
const Notification = require("../models/Notification");
const User = require("../models/User");
const StatusRequest = require("../models/StatusRequest");

const createJob = async (req, res, next) => {
    try{
        const { title, description, categoryId, preferredDate } = req.body;
    
        if(!title || !categoryId){
            res.status(400)
            throw new Error("Title and category are required")
        }
    
        const jobData = {
            title,
            description,
            category: categoryId,
            customer: req.user._id,
            preferredDate
        }
    
        const job = await Job.create(jobData);
    
        res.status(201).json({
            success: true,
            message: "Job created successfully"
        })

        //send notification to technicians about new job with same category
        const technicians = await User.find({ role: "technician", "technicianProfile.skills": categoryId });
        const notifications = technicians.map(technician => ({
            user: technician._id,
            message: `New job created in your category: ${title}`,
            job: job._id
        }));
        await Notification.insertMany(notifications);
    }
    catch(error){
        next(error);
    }
}

const getJobs = async (req, res, next) => {
    try {
        const { technicianId, customerId, status } = req.query;
        const filter = {};

        if (technicianId) filter.technician = technicianId;
        if (customerId) filter.customer = customerId;

        //for jobs with open status, and for techinicans who have the skill of the job category
        if (status && status === "open" && technicianId) {
            const technician = await User.findById(technicianId);
            if (!technician) {
                res.status(404);
                throw new Error("Technician not found");
            }
            filter.status = "open";
            filter.category = { $in: technician.technicianProfile.skills };
            filter.technician = null; // Only show unassigned jobs
        }

        if (status) {
            if (Array.isArray(status)) {
                filter.status = { $in: status };
            } else {
                filter.status = status;
            }
        }

        const jobs = await Job.find(filter)
            .populate('category', 'name')
            .select('_id title category status preferredDate createdAt')

        res.json(jobs);
    }catch (error) {
        next(error);
    }
}

const getJobById = async (req, res, next) => {
    try {
        const jobId = req.params.id;

        if(!jobId){
            res.status(400)
            throw new Error("Job ID is required")
        }

        const job = await Job.findById(jobId)
            .populate('category', 'name')
            .populate('customer', 'name email')
            .populate('technician', 'name email');
        if(!job){
            res.status(404)
            throw new Error("Job not found")
        }
        res.json(job);
    }catch (error) {
        next(error);
    }
}

const updateJobStatus = async (req, res, next) => {
    try {
        const jobId = req.params.id;
        const { fromStatus, toStatus } = req.body;

        if (!jobId) {
            res.status(400);
            throw new Error("Job ID is required");
        }

        if (!fromStatus || !toStatus) {
            res.status(400);
            throw new Error("From and to statuses are required");
        }

        const updateReq = await StatusRequest.findOne({ job: jobId});
        if (updateReq && updateReq.status === "pending") {
            res.status(400);
            throw new Error("There is already a pending status update request for this job");
        }

        const job = await Job.findById(jobId);
        if (!job) {
            res.status(404);
            throw new Error("Job not found");
        }
        if(job.status !== fromStatus){
            res.status(400);
            throw new Error(`Job status is not ${fromStatus}`);
        }
        if(job.technician && job.technician.toString() !== req.user._id.toString()){
            res.status(403);
            throw new Error("You are not the assigned technician for this job");
        }

        await StatusRequest.updateOne(
            { job: jobId },
            { job: jobId, fromStatus, toStatus, status: "pending" },
            { upsert: true }
        );

        await Notification.create({
            user: job.customer,
            message: `Your job "${job.title}" status update request from ${fromStatus} to ${toStatus} is pending approval.`,
            job: job._id
        });

        res.json({
            success: true,
            message: "Status update request created successfully"
        });

    } catch (error) {
        next(error);
    }
}

const getStatusRequestsForJob = async (req, res, next) => {
    try {
        const jobId = req.params.id;
        const statusRequest = await StatusRequest.findOne({ job: jobId });
        if(statusRequest.status !== "pending"){
            return res.json(null);
        }
        res.json(statusRequest);
    } catch (error) {
        next(error);
    }
}

const approveStatusUpdate = async (req, res, next) => {
    try {
        const reqId = req.params.id;
        console.log(reqId);
        
        const statusRequest = await StatusRequest.findById(reqId);

        if (!statusRequest) {
            res.status(404);
            throw new Error("Status update request not found");
        }

        if (statusRequest.status !== "pending") {
            res.status(400);
            throw new Error("Status update request is not pending");
        }

        const job = await Job.findById(statusRequest.job);
        if (!job) {
            res.status(404);
            throw new Error("Job not found");
        }
        if(job.customer.toString() !== req.user._id.toString()){
            res.status(403);
            throw new Error("You are not the customer for this job");
        }

        job.status = statusRequest.toStatus;
        await job.save();
        statusRequest.status = "approved";
        await statusRequest.save();
        await Notification.create({
            user: job.technician,
            message: `Status update for job "${job.title}" has been approved. New status: ${job.status}`,
            job: job._id
        });

        res.json({
            success: true,
            message: "Status update request approved successfully"
        });
    } catch (error) {
        next(error);
    }
}

const rejectStatusUpdate = async (req, res, next) => {
    try {
        const reqId = req.params.id;
        const statusRequest = await StatusRequest.findById(reqId);

        if (!statusRequest) {
            res.status(404);
            throw new Error("Status update request not found");
        }

        if (statusRequest.status !== "pending") {
            res.status(400);
            throw new Error("Status update request is not pending");
        }
        const job = await Job.findById(statusRequest.job);
        if(!job) {
            res.status(404);
            throw new Error("Job not found");
        }
        if(job.customer.toString() !== req.user._id.toString()){
            res.status(403);
            throw new Error("You are not the customer for this job");
        }

        statusRequest.status = "rejected";
        await statusRequest.save();

        await Notification.create({
            user: job.technician,
            message: `Your job "${job.title}" status update request from ${statusRequest.fromStatus} to ${statusRequest.toStatus} has been rejected.`,
            job: job._id
        });

        res.json({
            success: true,
            message: "Status update request rejected successfully"
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createJob,
    getJobs,
    getJobById,
    updateJobStatus,
    getStatusRequestsForJob,
    approveStatusUpdate,
    rejectStatusUpdate
}