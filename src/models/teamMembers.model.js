
const mongoose = require('mongoose');

const teamMembersSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    word: {
        type: String,
        required: true,
        trim: true
    },
    season: {
        type: String,
        required: true,
        trim: true
    },
    position: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: Buffer,
        // required: true
    },
    feature: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const teamMembersModels = mongoose.model('TeamMember', teamMembersSchema);

module.exports = teamMembersModels;