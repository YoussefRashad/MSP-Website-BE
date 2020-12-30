
const mongoose = require('mongoose');

const formRecruitmentAdminSchema = new mongoose.Schema({
    questions: {
        type: [mongoose.Schema.Types.Mixed]
    },
    open: {
        type: Boolean,
        default: false
    }
})



const form = new mongoose.model('FormRecruitmentAdmin', formRecruitmentAdminSchema)

module.exports = form