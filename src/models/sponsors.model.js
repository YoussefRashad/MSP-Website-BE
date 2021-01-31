
const mongoose = require('mongoose');

const sponsorsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    link: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

const sponsorsModels = mongoose.model('Sponsor', sponsorsSchema);

module.exports = sponsorsModels;