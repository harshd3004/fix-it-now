const moongoose = require('mongoose');

const connectDB = async () => {
    try {
        await moongoose.connect(process.env.MONGO_URI)
        console.log('MongoDB connected');
    }catch(err){
        console.error('MongoDB connection failed:', err.message);
        process.exit(1);
    }
}

module.exports = connectDB;