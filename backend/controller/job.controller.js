const Job = require("../models/Job");
const Notification = require("../models/notification");
const User = require("../models/User");

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
        if (status) filter.status = status;

        const jobs = await Job.find(filter).populate('category', 'name').select('_id title category status preferredDate createdAt')
        if(!jobs){
            res.status(404)
            throw new Error("No jobs found")
        }
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

module.exports = {
    createJob,
    getJobs,
    getJobById
}