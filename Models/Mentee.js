const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const menteeSchema = new Schema({
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
    ParentContact: {
        type: String,
        required: false
    },
    ImageUrl: {
        type: String,
        required: false
    },
    Interests: {
        type: [String],
        required: false
    },
    Hobbies: {
        type: [String],
        required: false
    },
    Mentor: {
        type: Schema.Types.ObjectId,
        ref: 'Mentor',
        required: false
    },
}, { timestamps: true });

module.exports = mongoose.model('Mentee', menteeSchema);