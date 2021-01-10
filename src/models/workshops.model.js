
const mongoose = require('mongoose');

const workshopsSchema = mongoose.Schema({
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
    image: {
        type: String,
        required: true,
    },
    feature: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const workshopsModels = mongoose.model('Workshop', workshopsSchema);

module.exports = workshopsModels;