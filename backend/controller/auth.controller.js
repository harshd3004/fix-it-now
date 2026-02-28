const User = require('../models/User');

const register = async (req, res, next) => {
    try {
        const { name, email, password, role, phone, address, skills, experienceYears } = req.body;

        //validate input
        if (!name || !email || !password ){
            res.status(400);
            throw new Error('Name, email and password are required.');
        }

        //check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400);
            throw new Error('User already exists.');
        }

        //create user
        const userData = {
            name,
            email,
            password,
            role,
            phone,
            address
        }
        if(role === 'technician'){
            userData.technicianProfile = {
                skills: skills || [],
                experienceYears: experienceYears || 0,
                ratingAverage: 0,
                ratingCount: 0,
                jobsCount: 0,
                isVerified: false
            }
        }
        
        await User.create(userData);

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
        });
    }catch(err){
        next(err);
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400);
            throw new Error('Email and password are required.');
        }

        const user = await User.findOne({ email });

        if (!user) {
            res.status(401);
            throw new Error('Invalid email or password.');
        }

        const isPasswordMatched = await user.comparePassword(password);

        if (!isPasswordMatched) {
            res.status(401);
            throw new Error('Invalid email or password.');
        }

        const token = await user.generateToken();

        res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    register,
    login
}