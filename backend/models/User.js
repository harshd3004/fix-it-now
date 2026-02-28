const { Schema, model, default: mongoose } = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const technicianProfileSchema = new Schema({
    //technician specific fields
    skills: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }],
    experienceYears: {
        type: Number,
        default: 0
    },
    ratingAverage: {
        type: Number,
        default: 0
    },
    ratingCount: {
        type: Number,
        default: 0
    },
    jobCount: {
        type: Number,
        default: 0
    },
    isVerified: {
        type: Boolean,
        default: false
    }
})

const UserSchema = new Schema({
    name : {
        type: String,
        required: true,
        trim: true
    },
    email : {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password : {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['customer', 'technician', 'admin'],
        default: 'customer'
    },

    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },

    technicianProfile: {
        type: technicianProfileSchema,
        default: null
    }

}, { timestamps: true });

UserSchema.pre('save', async function(){
    if (!this.isModified("password")) return; // Skip if unchanged
    const saltRounds = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, saltRounds);
});

UserSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
}

UserSchema.methods.generateToken = async function(){
    try {
        return jwt.sign({
            id: this._id,
            role: this.role
        }, process.env.JWT_SECRET, { expiresIn: '7d' });
    } catch (err) {
        return err;
    }
}

module.exports = model('User', UserSchema);
