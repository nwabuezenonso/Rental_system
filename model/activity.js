const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActivitySchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phonenumber: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    pickupLocation: {
        type: String,
        required: true
    }
}, {timestamps: true})

const Activity = mongoose.model('Activity', ActivitySchema);

module.exports = Activity;