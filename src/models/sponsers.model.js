
const mongoose = require('mongoose');

const sponsersSchema = mongoose.Schema({
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

const sponsersModels = mongoose.model('Sponser', sponsersSchema);

module.exports = sponsersModels;