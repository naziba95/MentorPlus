const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    Email: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    Role: { 
    type: String, 
    enum: ['Mentor', 'Mentee', 'Admin'],
    required: false
    }, 
    Otp: {
        type: String,
        required: false
    },
    OtpExpiryDate: {
        type: Date,
        required: false
    },
    status: {
        type: String, 
        enum: ['ACTIVE', 'LOCKED', 'SUSPENDED', 'INACTIVE', 'DELETED'],
        required: false 
    },

    CreatedAt: {
        type: Date,
        required: false
    },
    UpdatedAt: {
        type: Date,
        required: false
    },
    LastLogin: {
        type: Date,
        required: false
    },

});


module.exports = mongoose.model('User', userSchema);