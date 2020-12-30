
const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
    questions: {
        // uniqueName, question
        type: mongoose.Schema.Types.Mixed
    }
},{
    timestamps: true
});



const form = new mongoose.model('FormRecruitment', formSchema)

module.exports = form