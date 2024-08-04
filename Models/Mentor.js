const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mentorSchema = new Schema({
    FullName: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: false
    },

    PhoneNumber: {
        type: String,
        required: true
    },
    Interests: {
        type: [String],
        required: false
    },
    Hobbies: {
        type: [String],
        required: false
    },
    State: {
        type: String,
        required: false
    },
    Food: {
        type: String,
        required: false
    },
    PlaceOfWork: {
        type: String,
        required: false
    },
    University: {
        type: String,
        required: false
    },

}, { timestamps: true });

module.exports = mongoose.model('Mentor', mentorSchema);