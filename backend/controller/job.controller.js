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

module.exports = {
    createJob
}