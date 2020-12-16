
const mongoose = require('mongoose');

const eventsSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    images: {
        type: Buffer,
        // required: true,
    },
    feature: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const eventsModels = mongoose.model('Event', eventsSchema);

module.exports = eventsModels;