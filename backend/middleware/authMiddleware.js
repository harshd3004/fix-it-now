const jwt = require('jsonwebtoken');
const User = require('../models/User');

//authenticate token middleware
const authMiddleware = async (req, res, next) => {
    const authHeader = req.header("Authorization")

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        res.status(401).json({ message: "Unauthorized: No token provided" })
    }

    const token = authHeader.split(" ")[1]

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        
        const user = await User.findById(decoded.id).select("-password")
        if(!user){
            return res.status(401).json({ message: "Unauthorized: User not found" })
        }
        req.user = user
        next()

    } catch (error) {
        console.error("Token verification failed:", error)
        res.status(401).json({ message: "Unauthorized: Invalid token" })
    }
}

//middleware for admin only routes
const adminMiddleware = (req, res, next) => {
    if(!req.user || req.user.role !== "admin"){
        return res.status(403).json({ message: "Forbidden: Admins only" })
    }
    next()
}

//middleware for technician routes
const technicianMiddleware = (req, res, next) => {
    if(!req.user || req.user.role !== "technician" && req.user.role !== "admin"){
        return res.status(403).json({ message: "Forbidden: Technicians only" })
    }
    next()
}

module.exports = {
    authMiddleware,
    adminMiddleware,
    technicianMiddleware
}